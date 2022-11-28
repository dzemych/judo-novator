import {useCallback, useEffect, useState} from "react"
import ex from "../assets/images/ex.jpg"
import exTwo from "../assets/images/ex2.jpeg"
import back from "../assets/images/back.jpg"
import {CardType, ICardItem} from "src/types/card"


type IUseNavigation = ( length: number, type: CardType ) => {
   page: number
   pagesCount: number
   elements: ICardItem[]
   nextPageHandler: () => void
   prevPageHandler: () => void
   loading: boolean
}

const blogs: ICardItem[] = [
   {
      slug: 'some-blog-id',
      beforeTitle: 'Before title',
      title: 'Some super super mooper title',
      date: new Date(),
      text: 'Sub title with super description Sub title with super description and other imp stuff',
      photoSrc: ex,
   },
   {
      slug: '/',
      title: 'Some super super mooper title',
      date: new Date(),
      text: 'Sub title with super description Sub title with super description and other imp stuff',
      photoSrc: ex,
   },
   {
      slug: '/',
      title: 'Some super super mooper title',
      date: new Date(),
      text: 'Sub title with super description Sub title with super description and other imp stuff',
      photoSrc: ex,
   },
   {
      slug: '/',
      title: 'Some super super mooper title',
      date: new Date(),
      text: 'Sub title with super description Sub title with super description and other imp stuff',
      photoSrc: ex,
   },
   {
      slug: '/',
      title: 'Some super super mooper title',
      date: new Date(),
      text: 'Sub title with super description Sub title with super description and other imp stuff',
      photoSrc: ex,
   },
   {
      slug: '/',
      title: 'Some super super mooper title',
      date: new Date(),
      text: 'Sub title with super description Sub title with super description and other imp stuff',
      photoSrc: ex,
   },
   {
      slug: '/',
      title: 'Some super super mooper title',
      date: new Date(),
      text: 'Sub title with super description Sub title with super description and other imp stuff',
      photoSrc: ex,
   },
   {
      slug: '/',
      title: 'Some super super mooper title',
      date: new Date(),
      text: 'Sub title with super description Sub title with super description and other imp stuff',
      photoSrc: ex,
   },
   {
      slug: '/teams',
      title: 'Some super super mooper title',
      date: new Date(),
      text: 'sfasdaf sdfjklsd fjkdsjf kldsjfk sdfkjfsf jsdklfj',
      photoSrc: back
   },
   {
      slug: '/teams',
      title: 'Some super super mooper title',
      date: new Date(),
      text: 'sfasdaf sdfjklsd fjkdsjf kldsjfk sdfkjfsf jsdklfj',
      photoSrc: back
   },
   {
      slug: '/teams',
      title: 'Some super super mooper title',
      date: new Date(),
      text: 'sfasdaf sdfjklsd fjkdsjf kldsjfk sdfkjfsf jsdklfj',
      photoSrc: back
   },
   {
      slug: '/halls',
      title: 'Some super super mooper title Some super super mooper titleSome super super mooper title',
      date: new Date(),
      text: 'Sub title with super description Sub title with super description and other imp stuff',
      photoSrc: exTwo,
      beforeTitle: '65 Photographs'
   },
   {
      slug: '/teams',
      title: 'Some super super mooper title',
      date: new Date(),
      text: 'sfasdaf sdfjklsd fjkdsjf kldsjfk sdfkjfsf jsdklfj',
      photoSrc: back
   },
   {
      slug: '/teams',
      title: 'Some super super mooper title',
      date: new Date(),
      text: 'sfasdaf sdfjklsd fjkdsjf kldsjfk sdfkjfsf jsdklfj',
      photoSrc: back
   },
   {
      slug: '/teams',
      title: 'Some super super mooper title',
      date: new Date(),
      text: 'sfasdaf sdfjklsd fjkdsjf kldsjfk sdfkjfsf jsdklfj',
      photoSrc: back
   },
   {
      slug: '/teams',
      title: 'Some super super mooper title',
      date: new Date(),
      text: 'sfasdaf sdfjklsd fjkdsjf kldsjfk sdfkjfsf jsdklfj',
      photoSrc: back
   },
   {
      slug: '/teams',
      title: 'Some super super mooper title',
      date: new Date(),
      text: 'sfasdaf sdfjklsd fjkdsjf kldsjfk sdfkjfsf jsdklfj',
      photoSrc: back
   },
]

const albums: ICardItem[] = [
   {
      slug: '/',
      title: 'Some super super mooper titl mooper title Some super supere',
      photoSrc: ex,
      beforeTitle: '65 Photographs'
   },
   {
      slug: '/halls',
      title: 'Some super super mooper title Some super super mooper titleSome super super mooper title',
      photoSrc: exTwo,
      beforeTitle: '65 Photographs'
   },
]

const team: ICardItem[] = [
   {
      slug: '/',
      photoSrc: ex,
      title: 'Developer'
   },
   {
      slug: '/teams',
      photoSrc: exTwo,
      title: 'Trainer'
   },
   {
      slug: '/23',
      photoSrc: back,
      title: 'Doctor'
   },
   {
      slug: '/4',
      photoSrc: back,
      title: 'Doctor'
   },
   {
      slug: '/5',
      photoSrc: back,
      title: 'Doctor'
   },
]

const events: ICardItem[] = [
   {
      slug: '/',
      title: 'Some super super mooper title',
      date: new Date(),
      beforeTitle: 'City Canada',
      photoSrc: ex,
   },
   {
      slug: '/',
      title: 'Some super super mooper title',
      date: new Date(),
      beforeTitle: 'City Canada',
      photoSrc: ex,
   },
   {
      slug: '/teams',
      title: 'Some super super mooper title',
      date: new Date(),
      beforeTitle: 'City Canada',
      photoSrc: back
   },
   {
      slug: '/halls',
      title: 'Some super super mooper title Some super super mooper titleSome super super mooper title',
      date: new Date(),
      beforeTitle: 'City Canada',
      photoSrc: exTwo,
   },
   {
      slug: '/teams',
      title: 'Some super super mooper title',
      date: new Date(),
      beforeTitle: 'City Canada',
      photoSrc: back
   },
   {
      slug: '/teams',
      title: 'Some super super mooper title',
      date: new Date(),
      beforeTitle: 'City Canada',
      photoSrc: back
   },
   {
      slug: '/teams',
      title: 'Some super super mooper title',
      date: new Date(),
      beforeTitle: 'City Canada',
      photoSrc: back
   },
]

const useNavigation: IUseNavigation = (length, type) => {
   const [page, setPage] = useState(1)
   const [elements, setElements] = useState<ICardItem[]>([])
   const [loading, setLoading] = useState(false)

   const [pagesCount, setPagesCount] = useState(0)

   const fetchElements = useCallback(() => {
      setTimeout(() => {
         let startIdx = ((page - 1) * length)
         if (startIdx < 0) startIdx = 0

         const setArrs = (initArr: ICardItem[]) => {
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
   }, [page, length, type])

   // const scrollHandler = () => {
   //    const vh = window.innerHeight
   //    document.body.scrollTo(0, .5 * vh)
   // }

   // 1) Load initial elements
   useEffect(() => {
      setLoading(true)

      fetchElements()
   }, [page, fetchElements])

   const nextPageHandler = () => {
      if (page < pagesCount) {
         // scrollHandler()
         setPage(prev => prev + 1)
      }
   }

   const prevPageHandler = () => {
      if (page > 1) {
         // scrollHandler()
         setPage(prev => prev - 1)
      }
   }

   return { page, pagesCount, elements, nextPageHandler, prevPageHandler, loading }
}

export default useNavigation