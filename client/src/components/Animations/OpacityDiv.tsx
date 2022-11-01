import {FC} from "react";
import { motion } from 'framer-motion'


interface IProps {
   children: React.ReactNode,
   className:  string
}

const OpacityDiv: FC<IProps> = ({ children, className }) => {
   return (
      <motion.div
         className={className}
         initial={{ opacity: 0 }}
         animate={{
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