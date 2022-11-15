import {useEffect, useState} from "react";
import {CardType, ICard} from "../types/card";
import ex from "@images/ex.jpg";
import exTwo from "@images/ex2.jpeg";
import back from "@images/back.jpg";


type IUseNavigation = ( length: number, type: string, ) => {
   page: number
   pagesCount: number
   elements: ICard[]
   nextPageHandler: () => void
   prevPageHandler: () => void
   loading: boolean
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
      to: '/',
      title: 'Some super super mooper title',
      date: new Date(),
      text: 'Sub title with super description Sub title with super description and other imp stuff',
      photoSrc: ex.src,
   },
   {
      to: '/teams',
      title: 'Some super super mooper title',
      date: new Date(),
      text: 'sfasdaf sdfjklsd fjkdsjf kldsjfk sdfkjfsf jsdklfj',
      photoSrc: back.src
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
      to: '/23',
      photoSrc: back.src,
      title: 'Doctor'
   },
   {
      to: '/4',
      photoSrc: back.src,
      title: 'Doctor'
   },
   {
      to: '/5',
      photoSrc: back.src,
      title: 'Doctor'
   },
]

const events: ICard[] = [
   {
      to: '/',
      title: 'Some super super mooper title',
      date: new Date(),
      beforeTitle: 'City Canada',
      photoSrc: ex.src,
   },
   {
      to: '/',
      title: 'Some super super mooper title',
      date: new Date(),
      beforeTitle: 'City Canada',
      photoSrc: ex.src,
   },
   {
      to: '/teams',
      title: 'Some super super mooper title',
      date: new Date(),
      beforeTitle: 'City Canada',
      photoSrc: back.src
   },
   {
      to: '/halls',
      title: 'Some super super mooper title Some super super mooper titleSome super super mooper title',
      date: new Date(),
      beforeTitle: 'City Canada',
      photoSrc: exTwo.src,
   },
   {
      to: '/teams',
      title: 'Some super super mooper title',
      date: new Date(),
      beforeTitle: 'City Canada',
      photoSrc: back.src
   },
   {
      to: '/teams',
      title: 'Some super super mooper title',
      date: new Date(),
      beforeTitle: 'City Canada',
      photoSrc: back.src
   },
   {
      to: '/teams',
      title: 'Some super super mooper title',
      date: new Date(),
      beforeTitle: 'City Canada',
      photoSrc: back.src
   },
]

const useNavigation: IUseNavigation = (length, type) => {
   const [page, setPage] = useState(1)
   const [elements, setElements] = useState<ICard[]>([])
   const [loading, setLoading] = useState(false)

   // let pagesCount = Math.ceil(elements.length / length)
   const [pagesCount, setPagesCount] = useState(0)

   const fetchElements = () => {
      setTimeout(() => {
         let startIdx = ((page - 1) * length)
         if (startIdx < 0) startIdx = 0

         const setArrs = (initArr: ICard[]) => {
            const arr = initArr.slice(startIdx, startIdx + length)

            setElements(arr)
            setPagesCount(Math.ceil(initArr.length / length))
         }

         switch(type) {
            case CardType.BLOGS: {
               setArrs(blogs)
               break
            }
            case CardType.ALBUMS: {
               setArrs(albums)
               break
            }
            case CardType.TEAM: {
               setArrs(team)
               break
            }
            case CardType.EVENTS: {
               setArrs(events)
               break
            }
         }

         setLoading(false)
      }, 300)
   }

   // 1) Load initial elements
   useEffect(() => {
      setLoading(true)

      fetchElements()
   }, [page])

   const nextPageHandler = () => {
      if (page < pagesCount) {
         document.body.scrollTo(0, .5 * window.innerHeight)

         setPage(prev => prev + 1)
      }
   }

   const prevPageHandler = () => {
      if (page > 1) {
         document.body.scrollTo(0, .5 * window.innerHeight)

         setPage(prev => prev - 1)
      }
   }

   return { page, pagesCount, elements, nextPageHandler, prevPageHandler, loading }
}

export default useNavigation