import { ILanguage } from './language'

export interface IEvent {
   photos: string[],
   mainPhoto: string,
   backgroundPhoto: string,
   title: ILanguage,
   text: ILanguage
   address: ILanguage,
   startDate: Date,
   endDate: Date,
   location: {
      type: 'Point',
      coordinates: [number, number]
   }
}