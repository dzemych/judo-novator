import React, {FC, useState, useRef} from 'react'
import Box from '@mui/material/Box'
import {Grid, Typography} from '@mui/material'
import Editor from "../Editor/Editor"
import ImgInput from '../../ImgInput/ImgInput'
import GridInputContainer from '../../UI/GridInputContainer'
import useFormsState from "../../../hooks/useFormsState"
import {AboutState} from "../../../types/collection"
import {ItemFormProps} from "../../../types/item"
import {ITextInput} from "../../../types/textInput"
import TextInputs from "../TextInputs"
import ActionBtns from "../ActionBtns"
import FormsLayout from "../FormsLayout"
import usePhotosState from "../../../hooks/usePhotosState";


const initialState: AboutState = {
   mainPhoto: null,
   title: '',
   content: ''
}

const AboutForms: FC<ItemFormProps> = (
   {
      item = initialState,
      submitHandler,
   }) => {

   const editorContainerRef = useRef<HTMLElement>()

   const {
      formsState,
      handleFormsChange,
      isValid,
      formErrors,
      getFormData,
      formsLoading,
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

   const [__, setIsAllValid] = useState(true)

   const inputs: ITextInput[] = [
      {
         key: 'title',
         label: 'Заголовок',
         helperText: 'Заголовок має бути унікальним та містити мінімум 2 символи',
         error: formErrors.title ,
         value: formsState.title,
         changeHandler: handleFormsChange('title')
      }
   ]

   const onSubmit = async (e: React.SyntheticEvent) => {
      e.preventDefault()

      // Check if forms are filled properly
      const valid = await isValid()
      setIsAllValid(valid)

      // @ts-ignore
      if (valid)
         await submitHandler(getFormData(item))

      document.getElementById('main-root')?.scrollTo(0, 125)
   }

   return (
      <FormsLayout>
         <>
            <Grid container>
               <GridInputContainer key='img-input'>
                  <ImgInput
                     label='Головне фото'
                     changeHandler={val => { handleFormsChange('mainPhoto')(undefined, val) }}
                     deleteHandler={() => { handleFormsChange('mainPhoto')(undefined, null) }}
                     error={formErrors.mainPhoto}
                     state={formsState.mainPhoto}
                  />
               </GridInputContainer>

               <TextInputs inputs={inputs}/>

            </Grid>

            <Box ref={editorContainerRef} style={{
               margin: '0 auto 10px',
               width: '100%',
               maxWidth: '100%'
            }}>
               <Typography variant='h5' gutterBottom>
                  Тіло запису
               </Typography>

               <Editor
                  error={formErrors.content}
                  state={formsState.content}
                  changeHandler={handleFormsChange('content')}
               />
            </Box>

            <GridInputContainer id={'photos-input'}>
               <ImgInput
                  label='Фотографії'
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

            <ActionBtns
               disabled={formsLoading}
               onSubmit={onSubmit}
            />
         </>
      </FormsLayout>
   )
}

export default AboutForms