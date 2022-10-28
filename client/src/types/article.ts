import { ILanguage } from './language'

export interface IArticle {
   title: ILanguage,
   subTitle: ILanguage,
   text: ILanguage,
   date: Date,
   mainPhoto: string,
   backgroundPhoto: string,
   photos: string[]
}