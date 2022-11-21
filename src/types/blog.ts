import { ILanguage } from './language'

export interface IBlogCard {
   title: string
   date: Date
   subTitle: string
   imageSrc?: string
   slug?: string
}

export interface IArticle {
   title: ILanguage,
   subTitle: ILanguage,
   text: ILanguage,
   date: Date,
   mainPhoto: string,
   backgroundPhoto: string,
   photos: string[]
}