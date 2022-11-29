import React, { FC, useState, useRef } from 'react'
import classes from './NewItem.module.sass'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { Grid, Typography } from '@mui/material'
import dayjs, { Dayjs } from 'dayjs'
import {useNavigate} from "react-router-dom";
import Editor from "../Editor/Editor";
import ImgInput from '../UI/ImgInput'
import BigButton from '../UI/BigBtn'
import GridInputContainer from '../UI/GridInputContainer'
import DatePicker from '../UI/DatePicker'


type IHandleDate = (newValue: Dayjs | null) => void

interface IInput {
   label: string
   key: string
   helperText: string
   error?: boolean
}

interface IEditor {
   getData: () => string
}

const initialState = {
   title: '',
   afterTitle: '',
   beforeTitle: '',
   text: '',
}

// const initialErrorsState = {
//    title: false,
//    photo: false,
//    editor: false
// }

const NewItem: FC = () => {

   const editorRef = useRef<IEditor>()
   const editorContainerRef = useRef<HTMLElement>()

   const navigate = useNavigate()
   const [state, setState] = useState(initialState)
   const [imgState, setImgState] = useState()
   const [date, setDate] = React.useState<Dayjs | null>(dayjs())
   const [editorError, setEditorError] = useState(false)
   const [titleError, setTitleError] = useState(false)
   const [imgError, setImgError] = useState(false)
   // const [errorsState, setErrorsState] = useState(initialErrorsState)

   const inputs: IInput[] = [
      { label: 'Заголовок', key: 'title', helperText: 'Мінімум 2 символи', error: titleError },
      { label: 'Опис', key: 'text', helperText: '' },
      { label: 'Текст перед заголовком', key: 'beforeTitle', helperText: '' },
      { label: 'Текст після заголовку', key: 'afterTitle', helperText: '' },
   ]

   const handleDateChange: IHandleDate = (newValue) => {
      setDate(newValue)
   }

   const handleChange = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault()
      setState(prev => ({ ...prev, [key]: e.target.value }))
   }

   // const checkState = (editorData: string | undefined) => {
   //    let isError = false
   //    let newErrors = initialErrorsState
   //
   //    if (!editorData) {
   //       isError = true
   //       newErrors.editor = true
   //    }
   //
   //    if (!state.title) {
   //       isError = true
   //       newErrors.title = true
   //    }
   //
   //    if (!imgState) {
   //       isError = true
   //       newErrors.photo = true
   //    }
   //
   //    setErrorsState(newErrors)
   //    return isError
   // }

   const onSubmit = async (e: React.SyntheticEvent) => {
      e.preventDefault()

      // For some reason using errors state for all errors was not working,
      // state didn't update, only separate states for title and editor sounds.

      let isError = false
      const editorData = editorRef.current?.getData()
      // const isError = checkState(editorData)

      if (state.title.length < 2) {
         isError = true
         setTitleError(true)
      } else {
         setTitleError(false)
      }

      if (!editorData) {
         isError = true
         setEditorError(true)
      } else {
         setEditorError(false)
      }

      if (!imgState) {
         isError = true
         setImgError(true)
      } else {
         setImgError(false)
      }

      if (isError)
         document.getElementById('div-for-scroll')?.scrollIntoView()

      // Send to server

      // TODO only filled fields in state obj
      console.log(imgState)
      console.log(state)
      console.log(date)
      console.log(editorData)
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
            value={state[el.key as keyof typeof state]}
            onChange={ handleChange(el.key)}
         />
      </GridInputContainer>
   )

   return (
      <Box className={classes.container}>
         <div className={classes.scrollDiv} id='div-for-scroll'/>

         <Grid container>
            <GridInputContainer key='img-input'>
               <ImgInput setState={setImgState} error={imgError}/>
            </GridInputContainer>

            {inputs.map(renderInput)}

            <GridInputContainer key='date-picker'>
               <DatePicker value={date} handleChange={handleDateChange}/>
            </GridInputContainer>
         </Grid>

         <Box className={classes.editor_container} ref={editorContainerRef}>
            <Typography variant='h5' gutterBottom>
               Тіло запису
            </Typography>

            <div style={{ border: editorError ? '1px solid #d32f2f' : '' }}>
               <Editor ref={editorRef} collectionName={'blog'}/>
            </div>

            { editorError &&
               <p className={classes.editor_error}>Це поле не може бути пустим</p>
            }
         </Box>

         <Grid container justifyContent='center' alignItems='center' spacing={4}>
            <Grid item textAlign='center' xs={12} md={5}>
               <BigButton btntype='confirm' variant='contained' onClick={onSubmit}>
                  Додати
               </BigButton>
            </Grid>

            <Grid item textAlign='center' xs={12} md={5}>
               <BigButton btntype='cancel' variant='outlined' onClick={() => navigate(-1)}>
                  Скасувати
               </BigButton>
            </Grid>
         </Grid>
      </Box>
   )
}

export default NewItem