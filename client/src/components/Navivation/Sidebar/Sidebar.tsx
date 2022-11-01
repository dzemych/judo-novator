import {FC, useState} from 'react'
import classes from './Sidebar.module.sass'
import {useRouter} from "next/router";
import {AnimatePresence, motion} from "framer-motion";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faInstagram, faViber, faFacebook } from "@fortawesome/free-brands-svg-icons";

interface ILink {
   to: string,
   text: string
}

interface IProps {
   isOpen: boolean,
   toggleSidebar: () => void,
}

const Sidebar: FC<IProps> = ({ isOpen = false, toggleSidebar }) => {

   const [newPage, setNewPage] = useState(false)

   const bottomVariants = {
      inactive: {
         opacity: 0,
         y: 40
      },
      active: {
         y: 0,
         opacity: 1,
         transition: {
            delay: .4,
            duration: .4,
            transitionTimingFunction: 'cubic-bezier(.3,0,.5,1)',
            type: 'tween'
         }
      },
      exit: {
         opacity: 0,
         transition: {
            duration: .2,
            ease: 'linear'
         }
      }
   }

   const liVariants = {
      inactive: {
         scale: .8,
         opacity: 0,
      },
      active: (custom: number) => ({
         scale: 1,
         opacity: 1,
         transition: {
            delay: .3 + custom * .05,
            duration: .4,
            // ease: 'linear'
            transitionTimingFunction: 'cubic-bezier(.25,.1,.25,1)'
         }
      }),
      exit: {
         opacity: 0,
         // y: '100%',
         transition: {
            duration: .25,
            ease: 'linear'
            // transitionTimingFunction: 'cubic-bezier(.25,.1,.25,1)'
         }
      }
   }

   const sidebarVariants = {
      inactive: {
         y: '100vh',
         height: 0
      },
      active: {
         y: 0,
         height: '100%',
         transition: {
            duration: .5,
            transitionTimingFunction: 'cubic-bezier(.3,0,.5,1)'
         }
      },
      exit: {
         height: 0,
         transition: {
            duration: .5,
            transitionTimingFunction: 'cubic-bezier(.3,0,.5,1)'
         }
      }
   }

   const router = useRouter()

   const links: ILink[] = [
      { to: '/', text: 'Home' },
      { to: '/halls', text: 'Halls' },
      { to: '/team', text: 'Team' },
      { to: '/contact', text: 'Contact' },
      { to: '/about', text: 'About us' },
   ]

   const onLinkClick = (e: React.MouseEvent<Element, MouseEvent>, to: string) => {
      e.preventDefault()

      setNewPage(true)

      router.push(to)
      toggleSidebar()
   }

   const renderLi = (el: ILink, i: number) => {
      return (
         <motion.li
            variants={liVariants}
            custom={i}
            key={i}
         >
            <a
               onClick={e => onLinkClick(e, el.to)}
               className={classes.listLink}
               style={{ color: router.pathname === el.to ? 'white': '#878a8f' }}
            >
               {el.text}
            </a>
         </motion.li>
      )
   }

   return (
      <AnimatePresence>
         {isOpen && (
            <motion.div
               className={classes.container}
               variants={sidebarVariants}
               initial='inactive'
               animate='active'
               exit={newPage ? 'exit' : 'exit'}
            >
               <div className={classes.wrapper}>
                  <div className={classes.list_container}>
                     <ul>
                        {links.map((link, i) => renderLi(link, i))}
                     </ul>
                  </div>

                  <motion.div
                     className={classes.bottom_icons}
                     variants={bottomVariants}
                  >
                     <div className={classes.icon_container}>
                        <a href="https://www.instagram.com/judo_novator/" target="_blank">
                           <FontAwesomeIcon icon={faInstagram} />
                        </a>
                     </div>

                     <div className={classes.icon_container}>
                        <a href="https://www.facebook.com/judoNovator/" target="_blank">
                           <FontAwesomeIcon icon={faFacebook} />
                        </a>
                     </div>

                     <div className={classes.icon_container}>
                        <a href="https://invite.viber.com/?g2=AQBTy%2FmfSPKX1U5hwJ6RgyMpn3lGJXvi0Z8ZNTWfgv5ZQM777mGDfdh2kN5MXQMi" target="_blank">
                           <FontAwesomeIcon icon={faViber}/>
                        </a>
                     </div>
                  </motion.div>

                  <motion.div
                     className={classes.bottom_notation}
                     variants={bottomVariants}
                  >
                     © {new Date().getFullYear()} Dzemych Ivan
                  </motion.div>
               </div>
            </motion.div>
         )}
      </AnimatePresence>
   )
}

export default Sidebar