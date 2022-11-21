import {FC} from "react";
import classes from './MainBack.module.sass'
import ArrowDown from "../../public/icons/ArrowDown";
import { motion } from "framer-motion";
import OpacityYDiv from "@components/Animations/OpacityYDiv";
import ex from '@images/ex.jpg'


interface IProps {
   title: string
   imageSrc: string
   transparent?: boolean
}

const MainBack: FC<IProps> = ({ title, imageSrc, transparent }) => {
   const scrollToContent = () => {
      const vh = window.innerHeight
      const dist = transparent ? vh * .70 : vh * .8

      document.body.scrollTo(0, dist)
   }

   const cls = [classes.container]

   if (transparent)
      cls.push(classes.transparent)

   return (
      <div className={cls.join(' ')}>
         { !transparent &&
            <div className={classes.background}>
               <img src={ex.src} alt=''/>
               <div className={classes.opacity}/>
            </div>
         }

         <div className={classes.wrapper}>
            <OpacityYDiv className={classes.title}>
               {title}
            </OpacityYDiv>

            <motion.div
               className={classes.arrow_container}
               onClick={scrollToContent}
               animate={{
                  y: -38,
                  transition: {
                     duration: .5,
                     delay: .2,
                     repeat: Infinity,
                     repeatType: 'reverse',
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