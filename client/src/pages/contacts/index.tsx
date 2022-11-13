import {FC} from "react"
import classes from './Contact.module.sass'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebook, faInstagram, faViber} from "@fortawesome/free-brands-svg-icons";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import Loader from "@components/Loader/Loader";
import {AnimatePresence, motion} from "framer-motion";


const Contact: FC = () => {

   const mapVariants = {
      initial: { opacity: 0 },
      active: { opacity: 1, transition: { duration: .6 } },
      exit: { opacity: 0, transition: { duration: .5 } },
   }

   const contacts = [
      { title: 'Телефон', text: '+380 (53) 123 12 12' },
      { title: 'Імейл', text: 'some@gmail.com' },
   ]

   // @ts-ignore
   const { isLoaded } = useLoadScript({ googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY })

   const renderContactRow = (el: { title: string, text: string }) => (
      <div className={classes.row} key={el.title}>
         <div className={classes.row_title}>
            {el.title}:
         </div>

         <div className={classes.row_text}>
            {el.text}
         </div>
      </div>
   )

   return (
      <div className={classes.container}>
         <div className={classes.wrapper}>
            <h2 className={classes.title}>
               Наші контакти
            </h2>

            <div className={classes.content}>
               {contacts.map(renderContactRow)}
            </div>

            <div className={classes.map_container}>
               <h2 className={classes.map_title}>
                  Адреса
               </h2>

               <div className={classes.map_subTitle}>
                  Вулиця Тернопільська, 13/4, Хмельницький
               </div>

               <AnimatePresence exitBeforeEnter>
                  { isLoaded ?
                     <motion.div
                        variants={mapVariants}
                        className={classes.map_wrapper}
                        initial='initial'
                        animate='active'
                     >
                        <GoogleMap
                           zoom={14}
                           center={{ lat: 49.40498750122461, lng: 26.949719290231627 }}
                           mapContainerClassName={classes.map}
                        >
                           <Marker position={{ lat: 49.40498750122461, lng: 26.949719290231627 }}/>
                        </GoogleMap>
                     </motion.div>
                     : (
                        <motion.div
                           className={classes.loader_container}
                           variants={mapVariants}
                           initial='initial'
                           animate='active'
                           exit='exit'
                        >
                           <Loader/>
                        </motion.div>
                     )}
               </AnimatePresence>
            </div>

            <div className={classes.social_container}>
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
         </div>
      </div>
   )
}

export default Contact