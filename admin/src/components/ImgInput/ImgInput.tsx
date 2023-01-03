import React, {FC, useCallback, useMemo, useRef} from 'react'
import TextField from '@mui/material/TextField'
import classes from './ImgInput.module.sass'
import Grid from '@mui/material/Grid/Grid'
import ImgItem from "./ImgItem"


interface IProps {
   label: string
   helperText?: string
   error: boolean
   state: File | null | string | Array<string>
   changeHandler: (val: FileList) => Promise<void> | void
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

   const getUid = useCallback(() => {
      return `${Date.now()}-${Math.random() * 10000}`
   }, [])

   const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>

   const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault()
      const files = inputRef.current.files
      inputRef.current.files = new DataTransfer().files

      if (files?.length)
         await changeHandler(files)
   }

   const onInputClick = () => {
      inputRef.current.click()
   }

   const photosList = useMemo(() => {
      if (!state) return

      if (state instanceof File || typeof state === 'string' ) return (
         <ImgItem
            idx={0}
            key={'main-img'}
            img={state}
            type={'single'}
            deleteHandler={deleteHandler}
         />
      )

      // @ts-ignore
      if (Array.isArray(state) && Object.keys(state).length > 0)
         return (
            state.map((el, i) => {
               return (
                  <ImgItem
                     key={el === 'loading' ? getUid() : el}
                     img={el}
                     idx={i}
                     type={'multi'}
                     deleteHandler={deleteHandler}
                     nextHandler={nextHandler}
                     prevHandler={prevHandler}
                     firstHandler={firstHandler}
                  />
               )
            })
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