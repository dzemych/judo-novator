import {FC, useContext, useEffect, useState} from 'react'
import classes from './Header.module.sass'
import bell_logo from '../../../public/images/belt_white_club.png'
import Sidebar from '@components/Navivation/Sidebar/Sidebar'
import OpacityDiv from "@components/Animations/OpacityDiv";
import {AppContext} from "../../../pages/_app";
import {useRouter} from "next/router";


const Header: FC = () => {
   const {toggleNewPage} = useContext(AppContext)
   const router = useRouter()

   const [openSidebar, setOpenSidebar] = useState(false)
   const [sidebarAnimation, setSidebarAnimation] = useState(false)

   const burgerCls = [classes.menuBtn]
   if (openSidebar)
      burgerCls.push(classes.open)

   const mainMenuClick = () => {
      toggleNewPage()

      router.push('/')
      setOpenSidebar(false)
   }

   const toggleSidebar = () => {
      if (!sidebarAnimation)
         setOpenSidebar(prev => !prev)
   }

   useEffect(() => {
      setSidebarAnimation(true)
      setTimeout(() => {
         setSidebarAnimation(false)
      }, 500)

      if (openSidebar)
         document.body.style.overflow = 'hidden'

      if (!openSidebar)
         setTimeout(() => {
            document.body.style.overflow = 'auto'
         },  450)
   }, [openSidebar])

   return (
      <div className={classes.container}>
         <Sidebar isOpen={openSidebar} toggleSidebar={toggleSidebar}/>

         <OpacityDiv className={classes.judo_logo_container}>
            <img
               src={bell_logo.src}
               onClick={mainMenuClick}
               alt=''
            />
         </OpacityDiv>

         <OpacityDiv
            className={burgerCls.join(' ')}
            onClick={toggleSidebar}
         >
            <div className={classes.menuBtn__burger}></div>
         </OpacityDiv>
      </div>
   )
}

export default Header