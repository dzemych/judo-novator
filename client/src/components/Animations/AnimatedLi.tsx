import {FC} from "react";
import {motion, Variants} from 'framer-motion'


interface IProps {
   children: React.ReactNode,
   index: number
}

const AnimatedLi: FC<IProps> = ({ children, index }) => {
   const variants: Variants = {
      active: {
         transform: 'translateY(0)',
         opacity: 1
      },
      inactive: {
         transform: 'translateY(50px)',
         opacity: 0
      }
   }

   // const transition = `all .4s cubic-bezier(.3,0,.5,1) ${300 + 50 * index}ms`

   return (
      <motion.li
         key={index}
         animate={{ y: 50, transition: {duration: .5, delay: .5} }}
         // variants={variants}
         // initial={'inactive'}
         // animate={'active'}
         // transition={{ transition }}
         // transition={{
         //    delay: .5,
         //    duration: .5
            // cubicBezier: [.3, 0, .5, 1]
         // }}
      >
         {children}
      </motion.li>
   )
}

export default AnimatedLi