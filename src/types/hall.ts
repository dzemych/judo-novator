import { ILanguage } from './language'
import { ITeam } from './team'

export interface IHall {
   photos: string[],
   mainPhoto: string,
   backgroundPhoto: string,
   title: ILanguage,
   text: ILanguage,
   address: ILanguage,
   members: ITeam[],
   location: {
      type: 'Point',
      coordinates: [number, number]
   }
}