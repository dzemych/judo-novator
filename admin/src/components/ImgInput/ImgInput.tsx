import React, {FC, useCallback, useMemo, useRef} from 'react'
import TextField from '@mui/material/TextField'
import classes from './ImgInput.module.sass'
import Grid from '@mui/material/Grid/Grid'
import ImgItem from "./ImgItem"


interface IProps {
   label: string
   helperText?: string
   error: boolean
   state: File | null | string | Array<File | string>
   changeHandler: (val: FileList | File) => void
   deleteHandler: (idx: number) => void
   nextHandler?: (idx: number) => void
   prevHandler?: (idx: number) => void
   firstHandler?: (idx: number) => void
   multiple?: boolean
}

const ImgInput: FC<IProps> = (
   {
      error,
      changeHandler,
      state,
      multiple,
      label,
      deleteHandler,
      prevHandler,
      nextHandler,
      firstHandler,
      helperText
   }) => {

   const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>

   const getUuid = useCallback(() => {
      return `${Date.now()}-${Math.random() * 10000}`
   }, [])

   const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault()
      const files = inputRef.current.files

      if (files?.length) {
         if (!multiple)
            await changeHandler(files[0])

         if (multiple)
            await changeHandler(files)
      }
   }

   const onInputClick = () => {
      inputRef.current.click()
   }

   const photosList = useMemo(() => {
      if (state instanceof File || typeof state === 'string' ) return (
         <ImgItem
            idx={0}
            key={getUuid()}
            img={state}
            type={'single'}
            deleteHandler={deleteHandler}
            nextHandler={nextHandler}
            prevHandler={prevHandler}
            firstHandler={firstHandler}
         />
      )

      // @ts-ignore
      if (Array.isArray(state) && Object.keys(state).length > 0)
         return (
            state.map((el, i) => (
               <ImgItem
                  key={getUuid()}
                  img={el}
                  idx={i}
                  type={'multi'}
                  deleteHandler={deleteHandler}
                  nextHandler={nextHandler}
                  prevHandler={prevHandler}
                  firstHandler={firstHandler}
               />
            ))
         )
   }, [state])

   return (
      <div className={classes.container}>
         <TextField
            id="img-input"
            helperText={helperText ? helperText : 'Додайте фото'}
            error={error}
            label={label}
            defaultValue={multiple ? 'Додати фотографії' : 'Додати фото'}
            InputProps={{
               readOnly: true,
            }}
            onClick={onInputClick}
            className={classes.input_wrapper}
         />
         <input
            type='file'
            accept="image/*"
            multiple={multiple}
            ref={inputRef}
            onChange={handleChange}
            style={{ display: 'none' }}
         />

         <Grid
            container
            spacing={2}
            sx={{
               display: 'flex',
               flexDirection: 'row',
               alignItems: 'center',
               flexWrap: 'wrap',
               width: '100%'
            }}
         >
            {photosList}
         </Grid>

      </div>
   )
}

export default ImgInput