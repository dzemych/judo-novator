import {FC} from "react";
import classes from './MainBack.module.sass'
import ArrowDown from "../../public/icons/ArrowDown";
import { motion } from "framer-motion";
import OpacityYDiv from "@components/Animations/OpacityYDiv";


interface IProps {
   title: string,
   imageSrc: string
}

const MainBack: FC<IProps> = ({ title, imageSrc }) => {

   const scrollToContent = () => {
      const vh = window.innerHeight
      document.body.scrollTo(0, vh * .8)
   }

   return (
      <div className={classes.container}>
         <div className={classes.background}>
            <img src={imageSrc}/>
            <div className={classes.opacity}/>
         </div>

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