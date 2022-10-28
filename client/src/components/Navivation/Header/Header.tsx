import { FC, useState } from 'react'
import classes from './Header.module.sass'
import bell_logo from '@images/belt_white_club.png'
import Sidebar from '@components/Navivation/Sidebar/Sidebar'
import { Menu } from '@mui/icons-material'


const Header: FC = () => {

   const [openSidebar, setOpenSidebar] = useState(false)

   const toggleSidebar = () => {
      setOpenSidebar(prev => !prev)
   }

   return (
      <div className={classes.container}>
         <Sidebar isOpen={openSidebar} toggleSidebar={toggleSidebar}/>

         <div className={classes.judo_logo_container}>
            <img src={bell_logo.src} alt='' />
         </div>

         <Menu
            onClick={toggleSidebar}
            className={classes.menuIcon}
         />
      </div>
   )
}

export default Header