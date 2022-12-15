import React, {FC, useState, useRef} from 'react'
import classes from './ArticleEdit.module.sass'
import Box from '@mui/material/Box'
import {Grid, Typography} from '@mui/material'
import { Dayjs } from 'dayjs'
import Editor from "../Editor/Editor";
import ImgInput from '../../UI/ImgInput'
import GridInputContainer from '../../UI/GridInputContainer'
import DatePicker from '../../UI/DatePicker'
import useFormsState from "../../../hooks/useFormsState";
import {ArticleState} from "../../../types/collection";
import PopUpConfirm from "../../PopUp/PopUpConfirm";
import {ItemFormProps} from "../../../types/item";
import {ITextInput} from "../../../types/textInput";
import TextInputs from "../TextInputs";
import ActionBtns from "../ActionBtns";


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
      getFormData
   } = useFormsState(item ? item : initialState, type, collectionType)
   const [showDelete, setShowDelete] = useState(false)
   // Without changing global is valid state react doesn't update component on formErrors change
   const [isAllValid, setIsAllValid] = useState(true)

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

      if (valid) {
         const formData = getFormData(item)

         await submitHandler(formData)
      }

      document.getElementById('main-root')?.scrollTo(0, 125)
   }

   return (
      <Box className={classes.container}>
         <PopUpConfirm
            text={"Запис буде видалено назавжди"}
            isOpen={showDelete}
            onConfirm={deleteHandler}
            onClose={() => {setShowDelete(false)}}
         />

         <Grid container>
            <GridInputContainer key='img-input'>
               <ImgInput
                  changeHandler={handleFormsChange('mainPhoto')}
                  error={formErrors.mainPhoto}
                  photo={formsState.mainPhoto}
               />
            </GridInputContainer>

            <TextInputs inputs={inputs}/>

            <GridInputContainer key='date-picker'>
               <DatePicker
                  title={"Оберіть дату поста"}
                  value={formsState.date}
                  handleChange={handleDateChange}
               />
            </GridInputContainer>
         </Grid>

         <Box className={classes.editor_container} ref={editorContainerRef}>
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
            type={type}
            onSubmit={onSubmit}
            onDelete={() => setShowDelete(true)}
         />
      </Box>
   )
}

export default ArticleForms