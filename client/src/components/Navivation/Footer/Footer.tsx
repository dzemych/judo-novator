import classes from './Footer.module.sass'
import { FC } from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faInstagram, faViber, faFacebook } from "@fortawesome/free-brands-svg-icons";


const Footer: FC = () => {
   return (
      <div className={classes.container}>
         <div className={classes.wrapper}>
            <div className={classes.icons_container}>
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
            </div>

            <hr className={classes.hr}/>

            <span className={classes.copyRight_container}>
               © Copyright {new Date().getFullYear()} Дзюдо-Новатор. Все права защищены
            </span>

            <div className={classes.author_container}>
               Разработано - &nbsp;
               <a href="https://www.linkedin.com/in/dzemych/" target='_blank'>
                  Dzemych Ivan
               </a>
            </div>
         </div>
      </div>
   )
}

export default Footer