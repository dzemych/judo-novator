import {ChangeEvent} from "react";

export interface ITextInput {
   key: string
   label: string
   helperText: string
   changeHandler: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
   value: string
   error?: boolean
   rows?: number
}