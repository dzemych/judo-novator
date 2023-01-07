import {Dayjs} from "dayjs";

export enum CollectionType {
   BLOG = 'blog',
   HALLS = 'hall',
   TEAM = 'team',
   EVENT = 'event',
   ALBUM = 'album',
   ABOUT = 'about'
}

interface BaseState {
   title: string
   mainPhoto: null | File | string
   afterTitle: string
   beforeTitle: string
   text: string
   date: null | Dayjs
}

interface SocialMediaLinks {
   instagram: string
   facebook: string
   telegram: string
   viber: string
}

export interface ArticleState {
   title: string
   mainPhoto: null | File | string
   afterTitle: string
   beforeTitle: string
   text: string
   date: null | Dayjs
   content: undefined | string
   _id?: string
}

export interface AlbumState extends BaseState{
   photos: Array<null | File | string>
   description: string
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

export interface HallState {
   title: string
   address: string
   text: string
   mainPhoto: null | File | string
   photos: Array<null | File | string>
   _id?: string
}

export interface AboutState {
   title: string
   mainPhoto: null | File | string
   content: undefined | string
}