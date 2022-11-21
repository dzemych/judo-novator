import {FC} from "react"
import classes from './AnimatedImg.module.sass'
import {motion} from "framer-motion";
import {IAnimatedElProps} from "../../types/IAnimatedElProps";


interface IProps extends IAnimatedElProps {
   photoSrc: string
}

const AnimatedImg: FC<IProps> =
   ({
       photoSrc,
       delay = .2,
       whileInViewport,
       onClick,
       colorSchema = 'black'
   }) => {
   const imgCurtainVariants = {
      initial: {
         height: '100%'
      },
      active: {
         height: 0,
         transition: {
            duration: .4,
            delay: delay,
            ease: 'linear'
         }
      },
   }

   const imgVariants = {
      initial: {
         filter: 'blur(3px)',
         scale: .96
      },
      active: {
         scale: 1,
         filter: 'blur(0px)',
         transition: {
            duration: .4,
            delay: delay + .15,
            ease: 'linear'
         }
      }
   }

   const clsCurtain = [classes.curtain]

   if (colorSchema === 'black')
      clsCurtain.push(classes.black)

   if (colorSchema === 'white')
      clsCurtain.push(classes.white)

   return (
      <motion.div
         className={classes.container}
         onClick={onClick}
      >
         <div className={classes.backdrop}/>

         <motion.div
            variants={imgCurtainVariants}
            initial='initial'
            animate={ !whileInViewport ? 'active' : '' }
            whileInView={ whileInViewport ? 'active' : '' }
            viewport={{ once: true }}
            className={clsCurtain.join(' ')}
         />

         <div
            className={classes.img_container}
         >
            <motion.img
               variants={imgVariants}
               initial='initial'
               animate={ !whileInViewport ? 'active' : '' }
               whileInView={ whileInViewport ? 'active' : '' }
               viewport={{ once: true }}
               src={photoSrc}
               alt=""
            />
         </div>
      </motion.div>
   )
}

export default AnimatedImg