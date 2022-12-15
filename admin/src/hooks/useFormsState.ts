import React, { useState } from "react"
import {ArticleState, CollectionType, TeamState} from "../types/collection";
import useHttp from "./useHttp";
import { matchIsValidTel } from 'mui-tel-input'


type IChangeHandler =
   (key: string) =>
   (e: undefined | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, val?: any) =>
      void

type IFunction = <T extends (ArticleState | TeamState)>(initialState: T, type?: 'create' | 'update', collectionType?: CollectionType) => {
   formsState: T,
   handleFormsChange: IChangeHandler,
   isValid: () => Promise<boolean> | boolean,
   formErrors: any
   getFormData: (prevState: any) => FormData
}

const useFormsState: IFunction = (initialState, type, collectionType) => {
   const initialErrors = Object.keys(initialState).reduce((acc, key) => {
      // @ts-ignore
      acc[key] = false
      return acc
   }, {})

   const { requestJson } = useHttp()
   const [formsState, setFormsState] = useState(initialState)
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
      // @ts-ignore
      if (!formsState.email)
         return true

      // @ts-ignore
      return formsState.email.toLowerCase()
         .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
         )
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
   ////

   const validate = async (key: string): Promise<boolean> => {
      switch(key) {
         case 'title':
            return longerThanTwo(key) && await isUnique(key)

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
      const newErrors = initialErrors

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

   const handleFormsChange: IChangeHandler = key => (e , val) => {
      let v: string | undefined = e?.target.value

      if (val || key === 'content')
         v = val

      if (key === 'positionType')
         v = e?.target.value.toString()

      setFormsState(prev => {
         if (key === 'tel') {
            const numCount = val.split(' ').join('').split('').length

            if (v && numCount > 13)
               return {...prev, [key]: v.split('').slice(0, 14).join('')}
         }

         if (key.split('.').length === 2) {
            const keyArr = key.split('.')

            return {
               ...prev,
               [keyArr[0]]: {
                  ...prev[keyArr[0] as keyof typeof prev],
                  [keyArr[1]]: v
               }
            }
         }

         return { ...prev, [key]: v }
      })
   }

   const getFormData = (prevState?: any) => {
      // State with only filled fields
      const filteredState = Object.keys(formsState).reduce((acc, el) => {
         const key = el as keyof typeof formsState

         const isFilled = notEmpty(key as string)

         if (key === 'mainPhoto')
            return acc

         // @ts-ignore
         if (key === 'tel' && formsState[key].length < 6)
               return acc

         if (!isFilled)
            return acc

         if (type === 'update' && prevState && formsState[key] === prevState[key])
            return acc

         // Format date from DateJs to normal Date type
         if (key === 'date') { // @ts-ignore
            acc[key] = formsState.date?.unix()
         } else {// @ts-ignore
            acc[key] = formsState[key]
         }

         return acc
      }, {})

      const formData = new FormData()

      formData.append('data', JSON.stringify(filteredState))

      if (formsState.mainPhoto instanceof File)
            formData.append('upload', formsState.mainPhoto)

      return formData
   }

   return { formsState, handleFormsChange, isValid, formErrors, getFormData }
}

export default useFormsState