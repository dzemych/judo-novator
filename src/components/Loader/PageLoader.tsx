import {FC} from "react"
import classes from './PageLoader.module.sass'
import JudoCircle from '../../public/images/judo_circle'
import {AnimatePresence, motion} from "framer-motion";


const PageLoader: FC = () => {

   const containerVariants = {
      initial: {
         opacity: 0
      },
      active: {
        opacity: 1,
        transition: {
           duration: .4
        }
      },
      exit: {
         opacity: 0,
         transition: {
            duration: .4
         }
      }
   }

   const circleVariants = {
      initial: {
         opacity: 0,
      },
      active: {
         opacity: 1,
         transition: {
            duration: .2,
            delay: .3
         }
      },
      exit: {
         opacity: 0,
         transition: {
            duration: .2,
         }
      }
   }

   return (
      <motion.div
         variants={containerVariants}
         initial='initial'
         animate='active'
         exit='exit'
      >
         <motion.div
            className={classes.container}
            variants={circleVariants}
            initial='initial'
            animate='active'
            exit='exit'
         >
            <JudoCircle/>
         </motion.div>
      </motion.div>
   )
}

export default PageLoader