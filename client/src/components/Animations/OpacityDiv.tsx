import {FC} from "react";
import { motion } from 'framer-motion'


interface IProps {
   children?: React.ReactNode,
   className?:  string
   whileInViewport?: boolean
   onClick?: (e?: any) => void
   delay?: number
}

const OpacityDiv: FC<IProps> =
   ({
       children,
       className,
       whileInViewport,
       onClick,
      delay = 0
   }) => {
   const variants = {
      initial: {
         opacity: 0
      },
      active: {
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

export default OpacityDiv