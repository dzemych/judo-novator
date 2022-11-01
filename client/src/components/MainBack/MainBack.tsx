import {FC} from "react";
import classes from './MainBack.module.sass'
import ArrowDown from "../../assets/icons/ArrowDown";
import { motion } from "framer-motion";


interface IProps {
   title: string,
   imageSrc: string
}

const MainBack: FC<IProps> = ({ title, imageSrc }) => {

   const scrollToContent = () => {
      const vh = window.innerHeight
      window.scrollTo(0, vh * .8)
   }

   return (
      <div className={classes.container}>
         <div className={classes.background}>
            <img src={imageSrc} />
            <div className={classes.opacity}/>
         </div>

         <div className={classes.wrapper}>
            <motion.h1
               className={classes.title}
               initial={{
                  y: 40,
                  opacity: 0
               }}
               animate={{
                  y: 0,
                  opacity: 1,
                  transition: {
                     duration: .4
                  }
               }}
            >
               {title}
            </motion.h1>

            <motion.div
               className={classes.arrow_container}
               onClick={scrollToContent}
               animate={{
                  y: -38,
                  transition: {
                     duration: .4,
                     delay: .3,
                     yoyo: Infinity,
                     ease: 'easeOut'
                  }
               }}
            >
               <ArrowDown className={classes.arrowDown}/>
            </motion.div>

         </div>
      </div>
   )
}

export default MainBack