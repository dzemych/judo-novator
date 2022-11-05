import {FC} from "react";
import { motion } from 'framer-motion'


interface IProps {
   children?: React.ReactNode,
   className?:  string
}

const OpacityDiv: FC<IProps> = ({ children, className }) => {
   const variants = {
      initial: {
         opacity: 0
      },
      active: {
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
         animate='active'
      >
         {children}
      </motion.div>
   )
}

export default OpacityDiv