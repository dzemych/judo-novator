import {FC, useContext, useEffect, useState} from 'react'
import classes from './Header.module.sass'
import bell_logo from '@images/club.png'
import Sidebar from '@components/Navigation/Sidebar/Sidebar'
import OpacityDiv from "@components/Animations/OpacityDiv";
import {AppContext} from "../../../pages/_app";
import {useRouter} from "next/router";
import useMedia from "../../../hooks/useMedia";
import NavBar from "@components/Navigation/NavBar/NavBar";
import { motion } from 'framer-motion'


const curtainVariants = {
   close: {
      opacity: .5,
      height: 0,
      transition: {
         duration: .4,
         ease: 'easeInOut'
      }
   },
   open: {
      opacity: 1,
      height: '100%',
      transition: {
         duration: .4,
         ease: 'easeInOut'
      }
   }
}

const Header: FC = () => {
   const { isNormalLaptop } = useMedia()

   const {toggleNewPage, setSidebar, isSidebar} = useContext(AppContext)
   const router = useRouter()

   const [sidebarAnimation, setSidebarAnimation] = useState(false)
   const [showCurtain, setShowCurtain] = useState(false)

   const backCls = [classes.curtain]
   const burgerCls = [classes.menuBtn]

   if (isSidebar)
      burgerCls.push(classes.open)

   if (showCurtain)
      backCls.push(classes.open)

   if (!showCurtain)
      backCls.push(classes.close)

   const mainMenuClick = () => {
      toggleNewPage()

      router.push('/')
      setSidebar(false)
   }

   const toggleSidebar = () => {
      if (!sidebarAnimation)
         setSidebar(prev => !prev)
   }

   const scrollHandler = () => {
      const offset = Math.ceil(document.body.scrollTop)
      const vh = window.innerHeight

      if (offset / vh > .6)
         setShowCurtain(true)

      if (offset / vh < .6)
         setShowCurtain(false)
   }

   useEffect(() => {
      document.body.addEventListener('scroll', scrollHandler)

      return () => window.removeEventListener('scroll', scrollHandler)
   }, [])

   useEffect(() => {
      setSidebarAnimation(true)

      setTimeout(() => {
         setSidebarAnimation(false)
      }, 500)

      if (isSidebar)
         document.body.style.overflow = 'hidden'

      if (!isSidebar)
         setTimeout(() => {
            document.body.style.overflow = 'auto'
         },  450)
   }, [isSidebar])

   return (
      <div className={classes.container}>
         <motion.div
            className={classes.curtain}
            variants={curtainVariants}
            initial='close'
            animate={showCurtain ? 'open' : 'close'}
         />

         <Sidebar isOpen={isSidebar}/>

         <OpacityDiv className={classes.judo_logo_container}>
            <img
               src={bell_logo.src}
               onClick={mainMenuClick}
               alt=''
            />
         </OpacityDiv>

         { isNormalLaptop ?
            <NavBar/> :
            <OpacityDiv
               className={burgerCls.join(' ')}
               onClick={toggleSidebar}
            >
               <div className={classes.menuBtn__burger}></div>
            </OpacityDiv>
         }
      </div>
   )
}

export default Header