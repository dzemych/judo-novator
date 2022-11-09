import {FC} from "react";
import classes from './MainCard.module.sass'
import Button from "@components/Button/Button";
import useFormatDate from "../../hooks/useFormatDate";
import OpacityYDiv from "@components/Animations/OpacityYDiv";
import AnimatedImg from "@components/Animations/AnimatedImg";


interface IProps extends ICard {
   colorSchema?: 'white' | 'black'
   type: 'small' | 'big'
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

   if (colorSchema === 'black')
      cls.push(classes.black)

   if (colorSchema === 'white')
      cls.push(classes.white)

   const renderDate = () => {
      if (date) {
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
               <AnimatedImg photoSrc={photoSrc} whileInViewport/>
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