import {FC} from "react"
import classes from './Loader.module.sass'
import JudoCircle from '../../public/images/judo_circle'
import {AnimatePresence, motion} from "framer-motion";


const Loader: FC = () => {
   return (
      <AnimatePresence>
         <motion.div
            exit={{
               opacity: 0,
               transition: {
                  duration: .4,
               }
            }}
         >
            <div className={classes.container}>
               <JudoCircle/>
            </div>
         </motion.div>
      </AnimatePresence>
   )
}

export default Loader