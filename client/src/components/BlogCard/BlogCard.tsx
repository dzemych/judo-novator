import {FC} from "react";
import classes from './BlogCard.module.sass'
import ex from '@images/ex.jpg'
import Button from "@components/Button/Button";
import {IBlogCard} from "../../types/IBlogCard";
import useFormatDate from "../../hooks/useFormatDate";
import {motion} from "framer-motion";
import OpacityYDiv from "@components/Animations/OpacityYDiv";


interface IProps {
   type: 'white' | 'black'
   card: IBlogCard
}

const BlogCard: FC<IProps> = ({ type = 'black', card }) => {
   const imgCurtainVariants = {
      initial: {
         height: '100%'
      },
      active: {
         height: 0,
         transition: {
            duration: .4,
            delay: .15,
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
            duration: .3,
            delay: .5,
            ease: 'easeOut'
         }
      }
   }

   const formatDate = useFormatDate(card.date)

   const cls = [classes.container]

   if (type === 'black')
      cls.push(classes.black)

   if (type === 'white')
      cls.push(classes.white)

   return (
      <div className={cls.join(' ')}>
         <div className={classes.wrapper}>
            <div
               className={classes.image_container}
               // variants={imgVariants}
               // initial='initial'
               // animate='active'
               // whileInView='active'
               // viewport={{ once: true }}
            >
               <motion.div
                  variants={imgCurtainVariants}
                  initial='initial'
                  // animate='active'
                  whileInView='active'
                  viewport={{ once: true }}
                  className={classes.image_curtain}
               />
               <motion.img
                  variants={imgVariants}
                  initial='initial'
                  // animate='active'
                  whileInView='active'
                  viewport={{ once: true }}
                  src={ex.src}
                  alt=""
               />
            </div>

            <OpacityYDiv className={classes.content}>
               <h1 className={classes.title}>
                  {card.title}
               </h1>

               <div className={classes.date}>
                  {formatDate}
               </div>

               <div className={classes.subTitle_container}>
                  {card.subTitle}
               </div>

               <div className={classes.btn_container}>
                  <Button type={type}>
                     Подробнее
                  </Button>
               </div>
            </OpacityYDiv>
         </div>
      </div>
   )
}

export default BlogCard