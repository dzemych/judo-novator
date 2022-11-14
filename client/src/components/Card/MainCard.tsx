import {FC} from "react";
import classes from './MainCard.module.sass'
import Button from "@components/Button/Button";
import useFormatDate from "../../hooks/useFormatDate";
import OpacityYDiv from "@components/Animations/OpacityYDiv";
import AnimatedImg from "@components/Animations/AnimatedImg";
import {ICard} from "../../types/card";


interface IProps extends ICard {
   colorSchema?: 'white' | 'black'
   type: 'small' | 'big' | 'extraBig'
   showBtn?: boolean
}

const MainCard: FC<IProps> =
   ({
       colorSchema = 'black',
       title,
       to,
       text ,
       date,
       photoSrc,
       type,
       beforeTitle,
       showBtn= true
   }) => {
   const cls = [classes.container]

   if (type === 'big')
      cls.push(classes.big)

   if (type === 'small')
      cls.push(classes.small)

   if (type === 'extraBig')
      cls.push(classes.extraBig)

   if (colorSchema === 'black')
      cls.push(classes.black)

   if (colorSchema === 'white')
      cls.push(classes.white)

   const renderDate = () => {
      if (date) {
         // eslint-disable-next-line react-hooks/rules-of-hooks
         const formatDate = useFormatDate(date)

         return (
            <div className={classes.date}>
               {formatDate}
            </div>
         )
      }

      return null
   }

   return (
      <div className={cls.join(' ')}>
         <div className={classes.wrapper}>
            <div className={classes.image_container}>
               <AnimatedImg
                  colorSchema={colorSchema === 'white' ? "black" : 'white'}
                  photoSrc={photoSrc}
                  whileInViewport
               />
            </div>

            <OpacityYDiv className={classes.content} delay={.2} whileInViewport>
               {beforeTitle && (
                  <div className={classes.before_title}>
                     {beforeTitle}
                  </div>
               )}

               <h1 className={classes.title}>
                  {title}
               </h1>

               {renderDate()}

               {text && (
                  <div className={classes.subTitle_container}>
                     {text}
                  </div>
               )}

               {showBtn && (
                  <div className={classes.btn_container}>
                     <Button type={colorSchema}>
                        Подробнее
                     </Button>
                  </div>
               )}
            </OpacityYDiv>
         </div>
      </div>
   )
}

export default MainCard