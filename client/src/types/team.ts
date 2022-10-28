import { ILanguage } from './language'

export interface ITeam {
   slug: string,
   name: ILanguage,
   position: ILanguage,
   description?: ILanguage,
   photos?: string[],
   mainPhoto?: string,
   backgroundPhoto?: string,
   tel?: string,
   email?: string,
   instagram?: string,
   facebook?: string,
   telegram?: string
}