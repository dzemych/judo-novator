import {FC} from "react";
import classes from './MainCard.module.sass'
import Button from "@components/Button/Button";
import useFormatDate from "../../hooks/useFormatDate";
import {motion} from "framer-motion";
import OpacityYDiv from "@components/Animations/OpacityYDiv";


const MainCard: FC<ICard> =
   ({
       colorSchema = 'black',
       title,
       to,
       text ,
       date,
       photoSrc
   }) => {
   const imgCurtainVariants = {
      initial: {
         height: '100%'
      },
      active: {
         height: 0,
         transition: {
            duration: .4,
            delay: .2,
            ease: 'easeOut'
         }
      }
   }

   const imgVariants = {
      initial: {
         filter: 'blur(3px)',
      },
      active: {
         filter: 'blur(0px)',
         transition: {
            duration: .4,
            delay: .35,
            ease: 'easeOut'
         }
      }
   }

   const formatDate = useFormatDate(date)

   const cls = [classes.container]

   if (colorSchema === 'black')
      cls.push(classes.black)

   if (colorSchema === 'white')
      cls.push(classes.white)

   console.log(date)
   return (
      <div className={cls.join(' ')}>
         <div className={classes.wrapper}>
            <div className={classes.image_container}>
               <motion.div
                  variants={imgCurtainVariants}
                  initial='initial'
                  whileInView='active'
                  viewport={{ once: true }}
                  className={classes.image_curtain}
               />
               <motion.img
                  variants={imgVariants}
                  initial='initial'
                  whileInView='active'
                  viewport={{ once: true }}
                  src={photoSrc}
                  alt=""
               />
            </div>

            <OpacityYDiv whileInViewport className={classes.content}>
               <h1 className={classes.title}>
                  {title}
               </h1>

               {date && (
                  <div className={classes.date}>
                     {}
                  </div>
               )}

               <div className={classes.subTitle_container}>
                  {text}
               </div>

               <div className={classes.btn_container}>
                  <Button type={colorSchema}>
                     Подробнее
                  </Button>
               </div>
            </OpacityYDiv>
         </div>
      </div>
   )
}

export default MainCard