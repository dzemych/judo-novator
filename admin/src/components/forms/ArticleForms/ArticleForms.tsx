import React, {FC, useState, useRef} from 'react'
import Box from '@mui/material/Box'
import {Grid, Typography} from '@mui/material'
import { Dayjs } from 'dayjs'
import Editor from "../Editor/Editor"
import ImgInput from '../../ImgInput/ImgInput'
import GridInputContainer from '../../UI/GridInputContainer'
import DatePicker from '../../UI/DatePicker'
import useFormsState from "../../../hooks/useFormsState"
import {ArticleState} from "../../../types/collection"
import {ItemFormProps} from "../../../types/item"
import {ITextInput} from "../../../types/textInput"
import TextInputs from "../TextInputs"
import ActionBtns from "../ActionBtns"
import FormsLayout from "../FormsLayout"
import useOnePhotoState from "../../../hooks/useOnePhotoState";


type IHandleDate = (newValue: Dayjs | null) => void

const initialState: ArticleState = {
   mainPhoto: null,
   title: '',
   afterTitle: '',
   beforeTitle: '',
   text: '',
   date: null,
   content: ''
}


// TODO go to main photo in casa of error
const ArticleForms: FC<ItemFormProps> = (
   {
      collectionType,
      submitHandler,
      type ,
      item = initialState,
      deleteHandler
   }) => {

   const editorContainerRef = useRef<HTMLElement>()

   const {
      formsState,
      handleFormsChange,
      isValid,
      formErrors,
      getFormData,
      formsLoading,
   } = useFormsState(item ? item : initialState, type, collectionType)
   const [__, setIsAllValid] = useState(true)

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
   ]

   const handleDateChange: IHandleDate = (newValue) => {
      handleFormsChange('date')(undefined, newValue)
   }

   const onSubmit = async (e: React.SyntheticEvent) => {
      e.preventDefault()

      // Check if forms are filled properly
      const valid = await isValid()
      setIsAllValid(valid)

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
                     label='Головне фото запису*'
                     changeHandler={val => { handleFormsChange('mainPhoto')(undefined, val) }}
                     deleteHandler={() => { handleFormsChange('mainPhoto')(undefined, null) }}
                     error={formErrors.mainPhoto}
                     state={formsState.mainPhoto}
                  />
               </GridInputContainer>

               <TextInputs inputs={inputs}/>

               <GridInputContainer key='date-picker'>
                  <DatePicker
                     title={"Оберіть дату поста"}
                     value={formsState.date ? formsState.date : null}
                     handleChange={handleDateChange}
                  />
               </GridInputContainer>
            </Grid>

            <Box ref={editorContainerRef} style={{
               margin: '0 auto 10px',
               width: '100%',
               maxWidth: '100%'
            }}>
               <Typography variant='h5' gutterBottom>
                  Тіло запису*
               </Typography>

               <Editor
                  collectionName={collectionType}
                  error={formErrors.content}
                  state={formsState.content}
                  changeHandler={handleFormsChange('content')}
               />
            </Box>

            <ActionBtns
               disabled={formsLoading}
               type={type}
               onSubmit={onSubmit}
               deleteHandler={deleteHandler}
            />
         </>
      </FormsLayout>
   )
}

export default ArticleForms