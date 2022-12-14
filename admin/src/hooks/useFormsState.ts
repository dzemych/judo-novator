import React, { useState } from "react"


type IChangeHandler =
   (key: string) =>
   (e: undefined | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, val?: any) =>
      void

type IFunction = <T extends {}>(initialState: T) => {
   formsState: T,
   handleFormsChange: IChangeHandler,
   isValid: () => boolean,
   formErrors: any
   setToInitial: () => void
}

const useFormsState: IFunction = (initialState) => {
   const initialErrors = Object.keys(initialState).reduce((acc, key) => {
      // @ts-ignore
      acc[key] = false
      return acc
   }, {})

   const [formsState, setFormsState] = useState(initialState)
   const [formErrors, setFormErrors] = useState(initialErrors)

   const longerThanTwo = (key: string) => {
      // @ts-ignore
      return formsState[key].length >= 2
   }

   const validate = (key: string): boolean => {
      switch(key) {
         case 'title':
            return longerThanTwo(key)

         default: return true
      }
   }

   const isValid = (): boolean => {
      let isValid = true
      const newErrors = initialErrors

      Object.keys(formErrors).forEach((key) => {
         if (initialErrors.hasOwnProperty(key) && !validate(key)) {
            isValid = false
            // @ts-ignore
            newErrors[key] = true
         }
      })

      setFormErrors(newErrors)

      return isValid
   }

   const handleFormsChange: IChangeHandler = key => (e , val) => {
      let v: string | undefined

      if (val || key === 'content') {
         v = val
      } else {
         v = e?.target.value
      }

      setFormsState(prev => ({ ...prev, [key]: v }))
   }

   const setToInitial = () => {
      setFormsState(initialState)
   }

   return { formsState, handleFormsChange, isValid, formErrors, setToInitial }
}

export default useFormsState