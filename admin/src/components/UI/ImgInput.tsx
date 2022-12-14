import React, {FC, LegacyRef, useEffect, useRef, useState} from 'react'
import TextField from '@mui/material/TextField'
import classes from './ImgInput.module.sass'


interface IProps {
   error: boolean
   changeHandler: (e: React.ChangeEvent<HTMLInputElement>, val: any) => void
   photo: File | null | string
}

const ImgInput: FC<IProps> = ({ error, changeHandler, photo }) => {

   const [imgUrl, setImgUrl] = useState('')

   const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>
   const imgRef = useRef() as LegacyRef<HTMLImageElement> | undefined

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault()

      if (inputRef.current.files) {
         const photo = inputRef.current.files[0]
         changeHandler(e, photo)
      }
   }

   const onInputClick = () => {
      inputRef.current.click()
   }

   useEffect(() => {
      if (photo && typeof photo !== 'string') {
         const fr = new FileReader()

         fr.onload = () => {
            // @ts-ignore
            setImgUrl(fr.result)
         }

         fr.readAsDataURL(photo)
      }

      if (typeof photo === 'string')
         setImgUrl(photo)
   }, [photo])

   return (
      <div className={classes.container}>
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
            className={classes.input_wrapper}
         />
         <input
            type='file'
            accept="image/*"
            ref={inputRef}
            onChange={handleChange}
            style={{ display: 'none' }}
         />

         {photo &&
            <div className={classes.img_container}>
               <img
                  ref={imgRef}
                  src={imgUrl}
                  alt=""
               />
            </div>
         }
      </div>
   )
}

export default ImgInput