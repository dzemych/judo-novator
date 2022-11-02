import '../styles/fonts.sass'
import '../styles/global.sass'
import type { AppProps } from 'next/app'
import MainLayout from '../layouts/MainLayout'
import {useRouter} from "next/router"
import {createContext, useEffect, useState} from "react"
import {AnimatePresence, motion} from "framer-motion"
import Loader from "@components/Loader/Loader";


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
            duration: .4
         }
      },
      exit: {
         opacity: 0,
         transition: {
            duration: .4
         }
      }
   }

   const [newPage, setNewPage] = useState(false)

   const toggleNewPage = () => {
      setNewPage(prev => !prev)
   }

   const router = useRouter()

   useEffect(() => {

      const startHandler = () => {
         setNewPage(true)
         console.log(newPage)
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
   }, [])

   return (
      <AppContext.Provider value={{ newPage, toggleNewPage }}>
         <MainLayout>
            <AnimatePresence>
               { newPage
                  ? <Loader/>
                  :  <motion.div
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