import '../styles/fonts.sass'
import '../styles/global.sass'
import classes from 'src/styles/App.module.sass'
import type { AppProps } from 'next/app'
import MainLayout from '../layouts/MainLayout'
import {useRouter} from "next/router"
import {createContext, useEffect, useState} from "react"
import {AnimatePresence, motion} from "framer-motion"
import PageLoader from "@components/Loader/PageLoader";
// import PageLoader from "@components/Loader/PageLoader";


export const AppContext = createContext({
   newPage: false,
   toggleNewPage: () => {}
})

function MyApp({ Component, pageProps }: AppProps) {

   const pageVariants = {
      initial: {
         opacity: 0
      },
      active: {
         opacity: 1,
         transition: {
            duration: .4,
            delay: .4
         }
      },
      exit: {
         opacity: 0,
         transition: {
            duration: .4
         }
      }
   }

   const curtainVariants = {
      initial: {
         opacity: 0
      },
      active: {
         opacity: 1,
         transition: {
            duration: .3
         }
      },
      exit: {
         opacity: 0,
         transition: {
            duration: .5
         }
      }
   }

   const [newPage, setNewPage] = useState(false)
   const [showFooter, setShowFooter] = useState(true)

   const toggleNewPage = () => {
      setNewPage(prev => !prev)
   }

   const router = useRouter()

   useEffect(() => {
      const startHandler = async () => {
         setNewPage(true)
         document.body.scrollTo(0, 0)
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
      <AppContext.Provider value={{ newPage, toggleNewPage }}>
         <MainLayout footer={showFooter}>
            <AnimatePresence mode='wait'>
               {/*{ newPage &&*/}
               {/*   <motion.div*/}
               {/*      className={classes.curtain}*/}
               {/*      variants={curtainVariants}*/}
               {/*      initial='initial'*/}
               {/*      animate='active'*/}
               {/*      exit='exit'*/}
               {/*   /> }*/}
               { newPage ?
                  <PageLoader/> :
                  <motion.div
                     key={router.pathname}
                     variants={pageVariants}
                     initial='initial'
                     animate='active'
                     exit='exit'
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