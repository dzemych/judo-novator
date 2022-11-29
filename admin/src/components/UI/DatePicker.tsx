import React, { FC } from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Stack from '@mui/material/Stack'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import TextField from '@mui/material/TextField'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { Dayjs } from 'dayjs'

interface IProps {
   value: Dayjs | null
   handleChange: (newValue: Dayjs | null) => void
}

const DatePicker: FC<IProps> = ({ value, handleChange }) => {
   return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
         <Stack spacing={3}>
            <DesktopDatePicker
               label="Оберіть дату поста"
               inputFormat="DD/MM/YYYY"
               value={value}
               onChange={handleChange}
               renderInput={(params) => <TextField {...params} />}
            />
         </Stack>
      </LocalizationProvider>
   )
}

export default DatePicker