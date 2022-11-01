import '../styles/fonts.sass'
import '../styles/global.sass'
import type { AppProps } from 'next/app'
import MainLayout from '../layouts/MainLayout'
import {useRouter} from "next/router"
import {useEffect, useState} from "react"
import {AnimatePresence, motion} from "framer-motion"


function MyApp({ Component, pageProps }: AppProps) {

   const [newPage, setNewPage] = useState(false)

   const router = useRouter()

   useEffect(() => {

      const startHandler = () => {
         setNewPage(true)
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

   useEffect(() => {
      document.getElementById('preloader-el')?.remove()
   }, [])

   return (
      <MainLayout>
         <AnimatePresence>
            <motion.div
               key={router.pathname}
               initial={{
                  // opacity: 0,
                  // x: '100vw',
                  // clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)"
               }}
               animate={{
                  // opacity: 1,
                  // x: 0,
                  // clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
                  // transition: {
                  //    duration: .5
                  // }
               }}
               exit={{
                  // clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)",
                  // opacity: 0,
                  // x: '-100vw',
                  // scale: .5,
                  // transition: {
                  //    duration: .5,
                  //    delay: .5
                // }
               }}
            >
               { !newPage
                  ? <Component {...pageProps} />
                  : <div style={{background: 'red', width: '100%', height: '200vh'}}/>
               }
            </motion.div>
         </AnimatePresence>
      </MainLayout>
   )
}

export default MyApp