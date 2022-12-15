import {Dayjs} from "dayjs";

export enum CollectionType {
   BLOG = 'blog',
   HALLS = 'halls',
   TEAM = 'team',
   EVENT = 'event',
   ALBUM = 'album'
}

interface BaseState {
   title: string
   mainPhoto: null | File | string
}

interface SocialMediaLinks {
   instagram: string
   facebook: string
   telegram: string
   viber: string
}

export interface ArticleState extends BaseState {
   afterTitle: string
   beforeTitle: string
   text: string
   date: null | Dayjs
   content: undefined | string
   _id?: string
}

export interface TeamState {
   position: string
   name: string
   surname: string
   positionType: 'worker' | 'sportsman'
   mainPhoto: null | File | string
   mediaLinks: SocialMediaLinks
   birth: null | Dayjs
   description: string
   tel: string
   email: string
}