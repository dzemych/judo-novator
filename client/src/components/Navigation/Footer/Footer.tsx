import classes from './Footer.module.sass'
import { FC } from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faInstagram, faViber, faFacebook } from "@fortawesome/free-brands-svg-icons";
import {motion} from "framer-motion";


const Footer: FC = () => {

   const icons = {
      instagram: { icon: faInstagram, url: 'https://www.instagram.com/judo_novator/' },
      facebook: { icon: faFacebook, url: 'https://www.facebook.com/judoNovator/' },
      viber: { icon: faViber, url: 'https://invite.viber.com/?g2=AQBTy%2FmfSPKX1U5hwJ6RgyMpn3lGJXvi0Z8ZNTWfgv5ZQM777mGDfdh2kN5MXQMi' },
   }

   const iconVariants = {
      initial: {
         color: '#b5b5b5'
      },
      hover: {
         y: -8,
         scale: 1.3,
         color: '#f4f4f4',
         transition: {
            duration: .3,
            ease: 'easeOut'
         }
      }
   }

   const renderIcon = (icon: string) => {
      const curEl = icons[icon as keyof typeof icons]

      return (
         <motion.div
            key={icon}
            className={classes.icon_container}
            variants={iconVariants}
            initial='initial'
            whileHover='hover'
         >
            <FontAwesomeIcon
               icon={curEl.icon}
               onClick={() => { window.open(curEl.url) }}
            />
         </motion.div>
      )
   }

   return (
      <div className={classes.container}>
         <div className={classes.wrapper}>
            <div className={classes.icons_container}>
               {Object.keys(icons).map(renderIcon)}
            </div>

            <hr className={classes.hr}/>

            <div className={classes.content}>
               <span className={classes.copyRight_container}>
                  © Copyright {new Date().getFullYear()} Дзюдо-Новатор. Все права защищены
               </span>

               <div className={classes.author_container}>
                  Разработано - &nbsp;

                  <a href="https://www.linkedin.com/in/dzemych/" target='_blank' rel='noreferrer'>
                     Dzemych Ivan
                  </a>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Footer