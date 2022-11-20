import '../styles/fonts.sass'
import '../styles/global.sass'
import classes from 'src/styles/App.module.sass'
import type { AppProps } from 'next/app'
import MainLayout from '../layouts/MainLayout'
import {useRouter} from "next/router"
import {createContext, useEffect, useState} from "react"
import {AnimatePresence, motion} from "framer-motion"
import PageLoader from "@components/Loader/PageLoader";
import useMedia from "../hooks/useMedia";


type ISetSidebar<T> = (state: T) => T

interface IAppContext {
   newPage: boolean
   toggleNewPage: () => void
   setSidebar: (state: boolean | ISetSidebar<boolean>) => void
   isSidebar: boolean
}

export const AppContext = createContext<IAppContext>({
   newPage: false,
   toggleNewPage: () => {},
   setSidebar: (state: boolean | ISetSidebar<boolean>) => {},
   isSidebar: false
})

function MyApp({ Component, pageProps }: AppProps) {
   // TODO exit component animation is lagging after build

   const { isNormalLaptop, isBigLaptop } = useMedia()

   const pageVariants = {
      initial: {
         opacity: 0
      },
      active: {
         opacity: 1,
         transition: {
            duration: .4,
         }
      },
      exit: (bigScreen: boolean) => ({
         opacity: 0,
         transition: {
            duration: bigScreen ? 0 : .4,
         }
      })
   }

   // const curtainVariants = {
   //    initial: {
   //       opacity: 0
   //    },
   //    active: {
   //       opacity: 1,
   //       transition: {
   //          duration: .3
   //       }
   //    },
   //    exit: {
   //       opacity: 0,
   //       transition: {
   //          duration: .5
   //       }
   //    }
   // }

   const [newPage, setNewPage] = useState(false)
   const [showFooter, setShowFooter] = useState(true)
   const [isSidebar, setSidebar] = useState(false)

   const toggleNewPage = () => {
      setNewPage(prev => !prev)
   }

   const router = useRouter()

   useEffect(() => {
      const startHandler = async () => {
         setNewPage(true)
         setTimeout(() => {
            document.body.scrollTo(0, 0)
         } , 400)
         window.scrollTo(0, 0)
      }

      const completeHandler = () => {
         setNewPage(false)
      }

      router.events.on('routeChangeStart', startHandler)
      router.events.on('routeChangeComplete', completeHandler)
      router.events.on('routeChangeError', completeHandler)

      return () => {
         router.events.off('routeChangeStart', startHandler)
         router.events.off('routeChangeComplete', completeHandler)
         router.events.off('routeChangeError', completeHandler)
      }
   }, [router.events])

   useEffect(() => {
      if (router.pathname === '/contacts') {
         setShowFooter(false)
      } else {
         setShowFooter(true)
      }
   }, [router.pathname])

   return (
      <AppContext.Provider value={{ newPage, toggleNewPage, isSidebar, setSidebar }}>
         <MainLayout footer={showFooter}>
            <AnimatePresence mode='wait'>
               { newPage ?
                  <PageLoader/> :
                  <motion.div
                     key={router.pathname}
                     variants={pageVariants}
                     initial='initial'
                     animate={isSidebar ? '' : 'active'}
                     exit={isSidebar ? '' : 'exit'}
                     custom={isNormalLaptop}
                  >
                     <Component {...pageProps} />
                  </motion.div>
               }

            </AnimatePresence>
         </MainLayout>
      </AppContext.Provider>
   )
}

export default MyApp