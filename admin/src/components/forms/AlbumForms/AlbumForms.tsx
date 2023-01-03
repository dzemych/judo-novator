import React, {FC, useEffect, useState} from "react"
import {ItemFormProps} from "../../../types/item"
import FormsLayout from "../FormsLayout"
import {Grid} from "@mui/material"
import GridInputContainer from "../../UI/GridInputContainer"
import ImgInput from "../../ImgInput/ImgInput"
import useFormsState from "../../../hooks/useFormsState"
import {AlbumState} from "../../../types/collection"
import ActionBtns from "../ActionBtns"
import TextInputs from "../TextInputs"
import {ITextInput} from "../../../types/textInput"
import usePhotosState from "../../../hooks/usePhotosState"


const initialState: AlbumState = {
   mainPhoto: null,
   title: '',
   afterTitle: '',
   beforeTitle: '',
   text: '',
   date: null,
   photos: [],
   description: ''
}

const AlbumForms: FC<ItemFormProps> = (
   {
      item,
      submitHandler,
      deleteHandler,
      collectionType,
      type
   }
) => {

   const {
      formsState,
      handleFormsChange,
      isValid,
      formErrors,
      getFilteredState,
      formsLoading
   } = useFormsState(initialState, item, type, collectionType)
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
   // Without changing global is valid state react doesn't update component on formErrors change
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
         label: 'Текст перед заголовком',
         helperText: '',
         key: 'beforeTitle',
         error: formErrors.beforeTitle,
         value: formsState.beforeTitle,
         changeHandler: handleFormsChange('beforeTitle')
      },
      {
         label: 'Текст після заголовку',
         helperText: '',
         key: 'afterTitle',
         error: formErrors.afterTitle,
         value: formsState.afterTitle,
         changeHandler: handleFormsChange('afterTitle')
      },
      {
         label: 'Основний текст',
         helperText: '',
         key: 'description',
         error: formErrors.description,
         value: formsState.description,
         changeHandler: handleFormsChange('description')
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
                  label='Фотографії альбому'
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
            type={type}
            onSubmit={onSubmit}
            deleteHandler={deleteHandler}
            disabled={formsLoading || photosLoading}
         />
      </>
   </FormsLayout>
}

export default AlbumForms