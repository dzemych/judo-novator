import React, {useContext, useMemo, useState} from "react"
import {AlbumState, ArticleState, CollectionType, TeamState} from "../types/collection";
import useHttp from "./useHttp";
import {matchIsValidTel} from 'mui-tel-input'
import TempImgContext from "../components/context/tempImgContext";


type IChangeHandler =
   (key: string) =>
   (e: undefined | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, val?: any) =>
      void

type IFunction = <T extends (ArticleState | TeamState | AlbumState)>(initialState: T, type?: 'create' | 'update', collectionType?: CollectionType) => {
   formsState: T
   handleFormsChange: IChangeHandler
   isValid: () => Promise<boolean> | boolean
   formErrors: any
   getFormData: (prevState?: any) => FormData
   getFilteredState: (prev?: any) => object
   formsLoading: boolean
}

const useFormsState: IFunction = (initialState, type, collectionType) => {
   const initialErrors = useMemo(() => {
      const obj = Object.keys(initialState).reduce((acc, key) => {
         // @ts-ignore
         acc[key] = false
         return acc
      }, {})

      if (collectionType === CollectionType.TEAM)
         // @ts-ignore
         obj.mediaLinks = obj.mediaLinks ? obj.mediaLinks : {
            instagram: false,
            facebook: false,
            viber: false,
            telegram: false
         }

      return obj
   }, [initialState])

   const { requestJson, loading } = useHttp()
   const { uploadTempImg, loading: tempImgLoading } = useContext(TempImgContext)
   const [formsState, setFormsState] = useState(() => {
      const obj = {...initialState}

      if (collectionType === CollectionType.TEAM)
         // @ts-ignore
         obj.mediaLinks = obj.mediaLinks ? obj.mediaLinks : {
            instagram: '',
            facebook: '',
            viber: '',
            telegram: ''
         }

      return obj
   })
   const [formErrors, setFormErrors] = useState(initialErrors)

   //// Valid checkers
   const longerThanTwo = (key: string) => {
      // @ts-ignore
      return formsState[key].length >= 2
   }

   const notEmpty = (key: string) => {
      const val = formsState[key as keyof typeof formsState]

      return (
         val !== undefined &&
         val !== null &&
         val !== ''
      )
   }

   const isUnique = async (key: string) => {
      if (type === 'create' && collectionType) {
         const res = await requestJson(
            `/api/${collectionType}?${key}=${formsState[key as keyof typeof formsState]}`
         )

         return res.results < 1
      }
      return true
   }

   const isEmail = () => {
      if ('email' in formsState) {
         if (!formsState.email)
            return true

         return !!(formsState.email.toLowerCase()
            .match(
               /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            ))
      }

      return true
   }

   const isPhone = () => {
      // @ts-ignore
      if (!formsState.tel)
         return true

      // @ts-ignore
      if (formsState.tel.length < 6)
         return true

      // @ts-ignore
      return matchIsValidTel(formsState.tel)
   }

   const titleCheck = (key: string) => {
      // @ts-ignore
      return formsState[key as keyof typeof formsState].trim() !== 'new'
   }
   ////

   const validate = async (key: string): Promise<boolean> => {
      switch(key) {
         case 'title':
            return longerThanTwo(key) && await isUnique(key) && titleCheck(key)

         case 'content':
            return notEmpty(key)

         case 'mainPhoto':
            return notEmpty(key)

         case 'position':
            return longerThanTwo(key)

         case 'name':
            return longerThanTwo(key)

         case 'surname':
            return longerThanTwo(key)

         case 'email':
            return isEmail()

         case 'tel':
            return isPhone()

         default: return true
      }
   }

   const isValid = async (): Promise<boolean> => {
      let isValid = true
      const newErrors = {...initialErrors}

      const objKeys = Object.keys(formErrors)

      for (let i in objKeys) {
         const key = objKeys[i] as keyof typeof formErrors

         const valid = await validate(key)

         if (initialErrors.hasOwnProperty(key) && !valid) {
            isValid = false
            // @ts-ignore
            newErrors[key] = true
         }
      }

      setFormErrors(newErrors)

      return isValid
   }

   const handleMainPhotoChange = async (file: any) => {
      if (!file) {
         setFormsState(prev => ({...prev, mainPhoto: ''}))
         return
      }

      if (file instanceof FileList) {
         await setFormsState(prev => ({...prev, mainPhoto: 'loading'}))

         const formData = new FormData()
         formData.append('upload', file[0])

         const url = await uploadTempImg(file[0])
         if (url)
            setFormsState(prev => ({...prev, mainPhoto: url}))
      }

      if (typeof file === 'string')
         setFormsState(prev => ({...prev, mainPhoto: file}))
   }

   // TODO change temp file dir naming

   // TODO social links and phone not working correctly
   const handleFormsChange: IChangeHandler = key => (e , val) => {
      if (key === 'mainPhoto') {
         handleMainPhotoChange(val)
         return
      }

      let newValue: string | undefined

      if (val !== null && val !== undefined)
         newValue = val

      if (key === 'positionType')
         newValue = e?.target.value.toString()

      setFormsState(prev => {
         // * If we try to change something that is not in initial state return
         if (!(key in prev))
            return prev

         // 1) Check if phone is not too long, take only allowed count of numbers
         if (key === 'tel') {
            const numCount = val.split(' ').join('').split('').length

            if (newValue && numCount > 13)
               return {...prev, [key]: newValue.split('').slice(0, 14).join('')}
         }

         // 2) If trying to change nested fields change only necessary
         if (key.split('.').length === 2) {
            const keyArr = key.split('.')

            return {
               ...prev,
               [keyArr[0]]: {
                  ...prev[keyArr[0] as keyof typeof prev],
                  [keyArr[1]]: newValue
               }
            }
         }

         // 3) If v is undefined set it to default target value
         if (newValue === undefined) {
            if (!e || !e.target || !e.target.value) {
               newValue = ''
            } else {
               newValue = e.target.value
            }
         }

         return { ...prev, [key]: newValue }
      })
   }

   const getFilteredState = (prevState?: any) => {
      return Object.keys(formsState).reduce((acc, el) => {
         const key = el as keyof typeof formsState

         const isFilled = notEmpty(key as string)

         if (!isFilled)
            return acc

         // Process media links field, to contain only filled
         if (formsState[key] === "mediaLinks") {
            // @ts-ignore
            const obj = Object.keys(formsState[key]).reduce((acc, el) => {
               // @ts-ignore
               const val = formsState[key][el]
               if (val)
                  acc = val

               return acc
            }, {})

            return Object.keys(obj).length > 0 ? obj : acc
         }

         if (key === 'mainPhoto' && formsState.mainPhoto instanceof File)
            return acc

         // @ts-ignore
         if (key === 'tel' && formsState[key].length < 6)
            return acc

         if (type === 'update' && prevState && formsState[key] === prevState[key])
            return acc

         // Process date from DateJs to normal Date type
         if (key === 'date') { // @ts-ignore
            acc[key] = formsState.date?.unix()
         } else {// @ts-ignore
            acc[key] = formsState[key]
         }

         return acc
      }, {})
   }

   const getFormData = (prevState?: any) => {
      // State with only filled fields
      const filteredState = getFilteredState(prevState)

      const formData = new FormData()
      formData.append('data', JSON.stringify(filteredState))

      if (formsState.mainPhoto instanceof File)
            formData.append('upload', formsState.mainPhoto)

      return formData
   }

   return {
      formsState,
      handleFormsChange,
      isValid,
      formErrors,
      getFormData,
      getFilteredState,
      formsLoading: loading || tempImgLoading
   }
}

export default useFormsState