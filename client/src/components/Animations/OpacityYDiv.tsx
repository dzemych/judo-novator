import {FC} from "react";
import { motion } from 'framer-motion'


interface IProps {
   children?: React.ReactNode,
   className?:  string
   whileInViewport?: boolean
   onClick?: (e?: any) => void
}

const OpacityYDiv: FC<IProps> =
   ({
       children,
       className,
       whileInViewport,
       onClick
   }) => {

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