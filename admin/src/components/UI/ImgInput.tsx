import React, { FC, useRef } from 'react'
import TextField from '@mui/material/TextField'


interface IProps {
   error: boolean
   setState: (state: any) => void
}

const ImgInput: FC<IProps> = ({ error, setState }) => {
   const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault()

      if (inputRef.current.files) {
         const photo = inputRef.current.files[0]
         setState(photo)
      }
   }

   const onInputClick = () => {
      inputRef.current.click()
   }

   return (
      <>
         <TextField
            id="img-input"
            helperText={error ? 'Додайте фото' : ''}
            error={error}
            label="Головне фото запису"
            defaultValue="Додати фото"
            InputProps={{
               readOnly: true,
            }}
            onClick={onInputClick}
         />
         <input
            type='file'
            accept="image/*"
            ref={inputRef}
            onChange={handleChange}
            style={{ display: 'none' }}
         />
      </>
   )
}

export default ImgInput