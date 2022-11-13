import {useEffect, useState} from "react";
import {CardType, ICard} from "../types/card";
import ex from "@images/ex.jpg";
import exTwo from "@images/ex2.jpeg";
import back from "@images/back.jpg";


type IUseNavigation = ( length: number, type: string, ) => {
   page: number,
   pagesCount: number,
   elements: ICard[]
   nextPageHandler: () => void,
   prevPageHandler: () => void
}

const blogs: ICard[] = [
   {
      to: '/',
      title: 'Some super super mooper title',
      date: new Date(),
      text: 'Sub title with super description Sub title with super description and other imp stuff',
      photoSrc: ex.src,
   },
   {
      to: '/halls',
      title: 'Some super super mooper title Some super super mooper titleSome super super mooper title',
      date: new Date(),
      text: 'Sub title with super description Sub title with super description and other imp stuff',
      photoSrc: exTwo.src,
      beforeTitle: '65 Photographs'
   },
   {
      to: '/teams',
      title: 'Some super super mooper title',
      date: new Date(),
      text: 'sfasdaf sdfjklsd fjkdsjf kldsjfk sdfkjfsf jsdklfj',
      photoSrc: back.src
   },
   {
      to: '/teams',
      title: 'Some super super mooper title',
      date: new Date(),
      text: 'sfasdaf sdfjklsd fjkdsjf kldsjfk sdfkjfsf jsdklfj',
      photoSrc: back.src
   },
   {
      to: '/teams',
      title: 'Some super super mooper title',
      date: new Date(),
      text: 'sfasdaf sdfjklsd fjkdsjf kldsjfk sdfkjfsf jsdklfj',
      photoSrc: back.src
   },
   {
      to: '/teams',
      title: 'Some super super mooper title',
      date: new Date(),
      text: 'sfasdaf sdfjklsd fjkdsjf kldsjfk sdfkjfsf jsdklfj',
      photoSrc: back.src
   },
]

const albums: ICard[] = [
   {
      to: '/',
      title: 'Some super super mooper titl mooper title Some super supere',
      photoSrc: ex.src,
      beforeTitle: '65 Photographs'
   },
   {
      to: '/halls',
      title: 'Some super super mooper title Some super super mooper titleSome super super mooper title',
      photoSrc: exTwo.src,
      beforeTitle: '65 Photographs'
   },
]

const team: ICard[] = [
   {
      to: '/',
      photoSrc: ex.src,
      title: 'Developer'
   },
   {
      to: '/teams',
      photoSrc: exTwo.src,
      title: 'Trainer'
   },
   {
      to: '/teams',
      photoSrc: back.src,
      title: 'Doctor'
   },
]

const useNavigation: IUseNavigation = (length, type) => {
   const [page, setPage] = useState(1)
   const [elements, setElements] = useState<ICard[]>([])

   let pagesCount = Math.ceil(elements.length / length)

   // 1) Load initial elements
   useEffect(() => {
      switch(type) {
         case CardType.BLOGS: {
            setElements(blogs)
            break
         }
         case CardType.ALBUMS: {
            setElements(albums)
            break
         }
         case CardType.TEAM: {
            setElements(team)
            break
         }
      }
   }, [])

   const nextPageHandler = () => {
      if (page < pagesCount) {
         setPage(prev => prev + 1)

         document.body.scrollTo(0, .7 * window.innerHeight)
      }
   }

   const prevPageHandler = () => {
      if (page > 1) {
         setPage(prev => prev - 1)

         document.body.scrollTo(0, .7 * window.innerHeight)
      }
   }

   return { page, pagesCount, elements, nextPageHandler, prevPageHandler }
}

export default useNavigation