export interface ICardItem {
   mainPhoto: string
   title: string
   slug: string
   afterTitle?: string
   beforeTitle?: string
   text?: string
   date?: Date | undefined
}

export enum CardType {
   BLOGS = 'blog',
   ALBUMS = 'album',
   TEAM = 'person',
   SPORTSMEN = 'sportsmen',
   EVENTS = 'events',
   HALLS = 'halls',
}