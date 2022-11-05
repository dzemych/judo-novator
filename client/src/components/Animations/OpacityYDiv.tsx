import {FC} from "react";
import { motion } from 'framer-motion'


interface IProps {
   children?: React.ReactNode,
   className?:  string
}

const OpacityYDiv: FC<IProps> = ({ children, className }) => {

   const variants = {
      initial: {
         y: 35,
         opacity: 0
      },
      active: {
         y: 0,
         opacity: 1,
         transition: {
            duration: .45
         }
      }
   }

   return (
      <motion.div
         variants={variants}
         className={className}
         initial='initial'
         // animate='active'
         whileInView='active'
         viewport={{ once: true }}
      >
         {children}
      </motion.div>
   )
}

export default OpacityYDiv