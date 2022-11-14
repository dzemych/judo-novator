import {FC} from "react";
import {AnimatePresence, motion} from 'framer-motion'
import { IAnimatedElProps } from 'src/types/IAnimatedElProps'


const OpacityDiv: FC<IAnimatedElProps> =
   ({
       children,
       className,
       whileInViewport,
       onClick,
       delay = 0,
       exit = false
   }) => {
   const variants = {
      initial: {
         opacity: 0
      },
      active: {
         opacity: 1,
         transition: {
            duration: .45,
            delay: (whileInViewport && !delay) ? .2
               : (whileInViewport && delay) ? delay
               : 0
         }
      },
      exit: {
         opacity: 0,
         transition: {
            duration: .45
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
         exit={exit ? 'exit' : ''}
         whileInView={whileInViewport ? 'active' : ''}
         viewport={{ once: true }}
      >
         {children}
      </motion.div>
   )
}

export default OpacityDiv