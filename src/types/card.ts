export interface ICard {
   to: string
   title: string
   photoSrc: string
   city?: string
   beforeTitle?: string
   afterTitle?: string
   text?: string
   date?: Date
}

export enum CardType {
   BLOGS = 'blog',
   ALBUMS = 'album',
   TEAM = 'person',
   SPORTSMEN = 'sportsmen',
   EVENTS = 'events',
   HALLS = 'halls',
}