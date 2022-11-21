import {FC} from "react";
import { motion } from 'framer-motion'
import {IAnimatedElProps} from "../../types/IAnimatedElProps";


const OpacityYDiv: FC<IAnimatedElProps> =
   ({
       children,
       className,
       whileInViewport,
       onClick,
       delay = 0
   }) => {

   const variants = {
      initial: {
         y: 30,
         opacity: 0
      },
      active: {
         y: 0,
         opacity: 1,
         transition: {
            duration: .45,
            delay
         }
      }
   }

   return (
      <motion.div
         className={className}
         onClick={onClick}
         variants={variants}
         initial='initial'
         animate={!whileInViewport ? 'active' : ''}
         whileInView={whileInViewport ? 'active' : ''}
         viewport={{ once: true }}
      >
         {children}
      </motion.div>
   )
}

export default OpacityYDiv