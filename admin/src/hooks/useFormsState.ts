import React, { useState } from "react"


type IFunction = <T>(initialState: T) => {
   state: T,
   handleChange: (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => void
}

const useFormsState: IFunction = (initialState) => {
   const [state, setState] = useState(initialState)

   const handleChange = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setState(prev => ({ ...prev, [key]: e.target.value }))
   }

   return { state, handleChange }
}

export default useFormsState