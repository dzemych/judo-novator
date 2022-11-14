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
      to: '/teams',
      photoSrc: back.src,
      title: 'Doctor'
   },
   {
      to: '/teams',
      photoSrc: back.src,
      title: 'Doctor'
   },
   {
      to: '/teams',
      photoSrc: back.src,
      title: 'Doctor'
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
   const [loading, setLoading] = useState(false)

   // let pagesCount = Math.ceil(elements.length / length)
   const [pagesCount, setPagesCount] = useState(0)

   const fetchElements = () => {
      setTimeout(() => {
         const startIdx = (page - 1) * length

         switch(type) {
            case CardType.BLOGS: {
               const arr = blogs.slice(startIdx, startIdx + length)
               console.log(startIdx, startIdx + length)
               console.log(blogs)
               console.log(arr)

               setElements(arr)
               setPagesCount(Math.ceil(blogs.length / length))

               break
            }
            case CardType.ALBUMS: {
               const arr = albums.slice(startIdx, length)

               setElements(arr)
               setPagesCount(Math.ceil(albums.length / length))

               break
            }
            case CardType.TEAM: {
               const arr = team.slice(startIdx, length)

               setElements(arr)
               setPagesCount(Math.ceil(team.length / length))

               break
            }
         }

         setLoading(false)
      }, 1)
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