import {FC, useEffect, useState} from 'react'
import classes from './Header.module.sass'
import bell_logo from '@images/belt_white_club.png'
import Sidebar from '@components/Navivation/Sidebar/Sidebar'
import OpacityDiv from "@components/Animations/OpacityDiv";


const Header: FC = () => {
   const [openSidebar, setOpenSidebar] = useState(false)

   const burgerCls = [classes.menuBtn]
   if (openSidebar)
      burgerCls.push(classes.open)

   const toggleSidebar = () => {
      setOpenSidebar(prev => !prev)
   }

   useEffect(() => {
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
            <img src={bell_logo.src} alt='' />
         </OpacityDiv>

         <div
            className={burgerCls.join(' ')}
            onClick={toggleSidebar}
         >
            <div className={classes.menuBtn__burger}></div>
         </div>
      </div>
   )
}

export default Header