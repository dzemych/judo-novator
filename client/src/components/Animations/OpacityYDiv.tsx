import {FC} from "react";
import { motion } from 'framer-motion'


interface IProps {
   children: React.ReactNode,
   className?:  string
}

const OpacityDiv: FC<IProps> = ({ children, className }) => {
   return (
      <motion.div
         className={className}
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
         {children}
      </motion.div>
   )
}

export default OpacityDiv