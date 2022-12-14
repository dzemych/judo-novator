import React, {FC, useState, useRef} from 'react'
import classes from './ArticleEdit.module.sass'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import {Grid, Typography} from '@mui/material'
import { Dayjs } from 'dayjs'
import {useNavigate} from "react-router-dom";
import Editor from "./Editor/Editor";
import ImgInput from '../UI/ImgInput'
import BigButton from '../UI/BigBtn'
import GridInputContainer from '../UI/GridInputContainer'
import DatePicker from '../UI/DatePicker'
import useFormsState from "../../hooks/useFormsState";
import {ArticleState, CollectionType} from "../../types/collection";
import Button from "@mui/material/Button";
import useHttp from "../../hooks/useHttp";
import slugify from 'slugify'
import PopUpConfirm from "../PopUp/PopUpConfirm";
import {ItemFormProps} from "../../types/item";


type IHandleDate = (newValue: Dayjs | null) => void

interface IInput {
   label: string
   key: string
   helperText: string
   error?: boolean
}

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
   const { requestJson } = useHttp()

   const navigate = useNavigate()
   const {
      formsState,
      handleFormsChange,
      isValid,
      formErrors,
   } = useFormsState(item ? item : initialState)
   const [editorError, setEditorError] = useState(false)
   const [imgError, setImgError] = useState(false)
   const [uniqueError, setUniqueError] = useState(false)
   const [showDelete, setShowDelete] = useState(false)

   const inputs: IInput[] = [
      {
         label: 'Заголовок',
         helperText: 'Заголовок має бути унікальним та містити мінімум 2 символи',
         key: 'title',
         error: uniqueError || formErrors.title
      },
      {
         label: 'Опис',
         helperText: '',
         key: 'text',
         error: formErrors.text
      },
      {
         label: 'Текст перед заголовком',
         helperText: '',
         key: 'beforeTitle',
         error: formErrors.beforeTitle
      },
      {
         label: 'Текст після заголовку',
         helperText: '',
         key: 'afterTitle',
         error: formErrors.afterTitle
      },
   ]

   const handleDateChange: IHandleDate = (newValue) => {
      handleFormsChange('date')(undefined, newValue)
   }

   const validateAllForms = async (): Promise<boolean> => {
      let globalValid = true

      const isValidForms = isValid()

      if (!formsState.content) {
         globalValid = false
         setEditorError(true)
      } else {
         setEditorError(false)
      }

      if (!formsState.mainPhoto) {
         globalValid = false
         setImgError(true)
      } else {
         setImgError(false)
      }

      // Check if article is unique
      if (type === 'create') {
         const slug = slugify(formsState.title, { lower: true })
         if (formsState.title) {
            const isUnique = await requestJson(`/api/${collectionType}/check/${slug}`)

            if (!isUnique) {
               globalValid = false
               setUniqueError(true)
            } else {
               setUniqueError(false)
            }
         } else {
            setUniqueError(false)
         }

         if (slug === 'new') {
            globalValid = false
            setUniqueError(true)
         } else {
            setUniqueError(false)
         }
      }

      return globalValid && isValidForms
   }

   const onSubmit = async (e: React.SyntheticEvent) => {
      e.preventDefault()
      const isAllValid = await validateAllForms()

      if (isAllValid) {

         const candidateObj = {
            ...formsState,
            date: (formsState.date && formsState.date !== item.date)
               ? formsState.date?.unix() : null,
            mainPhoto: null,
         }

         // Body obj with only filled fields
         const dataObj = Object.keys(candidateObj).reduce((acc, key) => {
            if (
               // @ts-ignore
               candidateObj[key] &&
               // @ts-ignore
               candidateObj[key] !== item[key]
            ) {
               // @ts-ignore
               acc[key] = candidateObj[key]
            }
            return acc
         }, {})

         const formData = new FormData()

         formData.append('data', JSON.stringify(dataObj))
         // @ts-ignore
         if (formsState.mainPhoto instanceof File)
            formData.append('upload', formsState.mainPhoto)

         await submitHandler(formData)

      }
      document.getElementById('main-root')?.scrollTo(0, 60)
   }

   const renderInput = (el: IInput) => (
      <GridInputContainer key={el.key}>
         <TextField
            label={el.label}
            fullWidth
            variant="filled"
            multiline
            helperText={el.helperText}
            error={el.error}
            value={formsState[el.key as keyof typeof formsState]}
            onChange={ e => {handleFormsChange(el.key)(e)} }
         />
      </GridInputContainer>
   )

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
                  error={imgError}
                  photo={formsState.mainPhoto}
               />
            </GridInputContainer>

            {inputs.map(renderInput)}

            <GridInputContainer key='date-picker'>
               <DatePicker
                  value={formsState.date}
                  handleChange={handleDateChange}
               />
            </GridInputContainer>
         </Grid>

         <Box className={classes.editor_container} ref={editorContainerRef}>
            <Typography variant='h5' gutterBottom>
               Тіло запису
            </Typography>

            <Editor
               collectionName={collectionType}
               error={editorError}
               state={formsState.content}
               changeHandler={handleFormsChange('content')}
            />
         </Box>

         <Grid container justifyContent='center' alignItems='center' spacing={4}>
            <Grid item textAlign='center' xs={12} md={5}>
               <BigButton btntype='confirm' variant='contained' onClick={onSubmit}>
                  { type === 'create' ? 'Додати' : 'Оновити'}
               </BigButton>
            </Grid>

            <Grid item textAlign='center' xs={12} md={5}>
               <BigButton btntype='cancel' variant='outlined' onClick={() => navigate(-1)}>
                  Скасувати
               </BigButton>
            </Grid>

            {type === 'update' &&
               <Grid item textAlign='center' xs={12} md={5}>
                  <Button
                     variant='contained'
                     color='error'
                     onClick={() => {setShowDelete(true)}}
                  >
                     Видалити запис
                  </Button>
               </Grid>
            }
         </Grid>
      </Box>
   )
}

export default ArticleForms