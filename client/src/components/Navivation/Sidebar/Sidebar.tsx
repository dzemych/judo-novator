import { FC } from 'react'
import classes from './Sidebar.module.sass'
// import { Close } from '@mui/icons-material'
import {CSSTransition} from "react-transition-group";
import AnimatedLi from "@components/Animations/AnimatedLi";
import {useRouter} from "next/router";


interface ILink {
   to: string,
   text: string
}

interface IProps {
   isOpen: boolean,
   toggleSidebar: () => void
}

const Sidebar: FC<IProps> = ({ isOpen = false }) => {

   const router = useRouter()

   const links: ILink[] = [
      { to: '/', text: 'Home' },
      { to: '/halls', text: 'Halls' },
      { to: '/team', text: 'Team' },
      { to: '/contact', text: 'Contact' },
      { to: '/about', text: 'About us' },
   ]

   const cls = [classes.container]

   const onLinkClick = (e: React.MouseEvent<Element, MouseEvent>, to: string) => {
      e.preventDefault()
      router.push(to)
   }

   const renderLi = (el: ILink, i: number) => {
      return (
         <AnimatedLi
            index={i}
            key={i}
         >
            <a
               onClick={e => onLinkClick(e, el.to)}
               className={classes.listLink}
            >
               {el.text}
            </a>
         </AnimatedLi>
      )
   }

   return (
      <CSSTransition
         in={isOpen}
         timeout={500}
         classNames={{
            enter: classes.enterMove,
            enterActive: classes.enterActiveMove,
            enterDone: classes.enterDoneMove,
            exit: classes.exitMove,
            exitActive: classes.exitActiveMove,
            exitDone: classes.exitDoneMove
         }}
      >
         <div className={cls.join(' ')}>
            <div className={classes.wrapper}>
               <div className={classes.list_container}>
                  <ul>
                     {links.map((link, i) => renderLi(link, i))}
                  </ul>
               </div>
            </div>
         </div>
      </CSSTransition>
   )
}

export default Sidebar