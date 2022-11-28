import React, {FC, useState} from "react"
import classes from './NewItem.module.sass'
import Box from '@mui/material/Box'
import Button, {ButtonProps} from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import {Grid, styled} from "@mui/material"
import dayjs, { Dayjs } from 'dayjs'
import Stack from '@mui/material/Stack'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import {useNavigate} from "react-router-dom";
import Editor from "../Editor/Editor";


type IHandleDate = (newValue: Dayjs | null) => void

interface IInput {
   label: string
   key: string
   helperText: string
   error: boolean
}

interface IBigButton extends ButtonProps {
   btntype?: 'confirm' | 'cancel'
}

const initialState = {
   photoSrc: null,
   title: '',
   city: '',
   beforeTitle: '',
   text: '',
   date: new Date()
}

const inputs: IInput[] = [
   { label: 'Заголовок', key: 'title', helperText: '', error: false },
   { label: 'Опис', key: 'text', helperText: '', error: false },
   { label: 'Текст перед заголовком', key: 'beforeTitle', helperText: '', error: false },
   { label: 'Текст після заголовку', key: 'afterTitle', helperText: '', error: false },
]

const BigButton = styled(Button)<IBigButton>( ({ theme, btntype }) => ({
   padding: btntype === 'confirm' ?
      theme.spacing(2, 6, 2, 6)
      : theme.spacing(1.25, 4, 1.25, 4),
   fontSize: btntype === 'confirm' ? '1.5rem' : '1rem',
   borderRadius: '5px',
   margin: btntype === 'confirm' ? '0 auto 20px' : '0 auto'
}) )

const NewItem: FC = () => {

   const navigate = useNavigate()
   const [state, setState] = useState(initialState)
   const [date, setDate] = React.useState<Dayjs | null>(dayjs())

   const handleDateChange: IHandleDate = (newValue) => {
      setDate(newValue)
   }

   const handleChange = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault()
      setState(prev => ({ ...prev, [key]: e.target.value }))
   }

   const renderInput = (el: IInput) => (
      <Grid item xs={12} sx={{ mb: 2 }} key={el.key}>
         <TextField
            label={el.label}
            fullWidth
            variant="filled"
            multiline
            // @ts-ignore
            value={state[el.key]}
            onChange={ handleChange(el.key)}
         />
      </Grid>
   )

   const renderDatePicker = () => (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
         <Stack spacing={3}>
            <DesktopDatePicker
               label="Оберіть дату поста"
               inputFormat="DD/MM/YYYY"
               value={date}
               onChange={handleDateChange}
               renderInput={(params) => <TextField {...params} />}
            />
         </Stack>
      </LocalizationProvider>
   )

   return (
      <Box className={classes.container}>
         <Grid container>
            {inputs.map(renderInput)}

            <Grid
               item
               xs={12}
               sx={{ mb: 2 }}
               key='date-picker'
            >
               {renderDatePicker()}
            </Grid>
         </Grid>

         <Box className={classes.editor_wrapper}>
            <Editor/>
         </Box>

         <BigButton btntype='confirm' variant='contained'>
            Додати
         </BigButton>

         <BigButton btntype='cancel' variant='outlined' onClick={() => navigate(-1)}>
            Скасувати
         </BigButton>
      </Box>
   )
}

export default NewItem