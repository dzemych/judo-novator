import React, {FC, useEffect, useState} from "react"
import useFormsState from "../../../hooks/useFormsState";
import usePhotosState from "../../../hooks/usePhotosState";
import ActionBtns from "../ActionBtns";
import {ItemFormProps} from "../../../types/item";
import {HallState} from "../../../types/collection";
import {ITextInput} from "../../../types/textInput";
import TextInputs from "../TextInputs";
import {Grid} from "@mui/material";
import FormsLayout from "../FormsLayout";
import ImgInput from "../../ImgInput/ImgInput";
import GridInputContainer from "../../UI/GridInputContainer";


const initialState: HallState = {
   address: "",
   mainPhoto: null,
   photos: [],
   title: '',
   text: ''
}

const HallForms: FC<ItemFormProps> = ({ item, submitHandler }) => {
   const {
      formsState,
      handleFormsChange,
      isValid,
      formErrors,
      getFilteredState,
      formsLoading
   } = useFormsState(initialState, item)
   const {
      photos,
      changePhotosHandler,
      deletePhotosHandler,
      nextPhotoHandler,
      prevPhotoHandler,
      firstPhotoHandler,
      isValidPhotos,
      photosError,
      photosLoading
   } = usePhotosState(item?.photos ? item.photos : [])
   const [isAllValid, setIsAllValid] = useState(true)

   const onSubmit = async (e: React.SyntheticEvent) => {
      e.preventDefault()

      const photoValid = isValidPhotos()
      const formsValid = await isValid()

      const validity = photoValid && formsValid
      setIsAllValid(validity)

      if (validity) {

         const filteredForms = getFilteredState(item)
         // @ts-ignore
         filteredForms.photos = photos

         console.log(filteredForms)
         const formData = new FormData()
         formData.append('data', JSON.stringify(filteredForms))

         await submitHandler(formData)
      }
   }

   const inputs: ITextInput[] = [
      {
         key: 'title',
         label: 'Заголовок*',
         helperText: 'Заголовок має бути унікальним та містити мінімум 2 символи',
         error: formErrors.title ,
         value: formsState.title,
         changeHandler: handleFormsChange('title')
      },
      {
         key: 'text',
         label: 'Опис',
         helperText: '',
         error: formErrors.text,
         value: formsState.text,
         changeHandler: handleFormsChange('text')
      },
      {
         key: 'address',
         label: 'Адреса',
         helperText: '',
         error: formErrors.address,
         value: formsState.address,
         changeHandler: handleFormsChange('address')
      },
   ]

   useEffect(() => {
      if (!isAllValid) {
         if (formErrors.mainPhoto || formErrors.title) {
            document.getElementById('main-root')?.scrollTo(0, 120)
         } else {
            document.getElementById('photos-input')?.scrollIntoView()
         }
      }
   }, [formErrors, isAllValid, photosError])

   return <FormsLayout>
      <>
         <Grid container>
            <GridInputContainer>
               <ImgInput
                  label='Головне фото запису*'
                  changeHandler={val => { handleFormsChange('mainPhoto')(undefined, val) }}
                  deleteHandler={() => { handleFormsChange('mainPhoto')(undefined, null) }}
                  error={formErrors.mainPhoto}
                  state={formsState.mainPhoto}
               />
            </GridInputContainer>

            <TextInputs inputs={inputs}/>

            <GridInputContainer id={'photos-input'}>
               <ImgInput
                  label='Фотографії залу'
                  helperText={'Додайте хоча б два фото'}
                  deleteHandler={deletePhotosHandler}
                  changeHandler={changePhotosHandler}
                  prevHandler={prevPhotoHandler}
                  nextHandler={nextPhotoHandler}
                  firstHandler={firstPhotoHandler}
                  error={photosError}
                  state={photos}
                  multiple={true}
               />
            </GridInputContainer>
         </Grid>

         <ActionBtns
            onSubmit={onSubmit}
            disabled={formsLoading || photosLoading}
         />
      </>
   </FormsLayout>
}

export default HallForms