import {FC} from "react";
import classes from './BlogCard.module.sass'
import ex from '@images/ex.jpg'
import Button from "@components/Button/Button";
import {IBlogCard} from "../../types/IBlogCard";


interface IProps {
   type: string
   card: IBlogCard
}

const BlogCard: FC<IProps> = ({ type = 'black', card }) => {
   return (
      <div className={classes.container}>
         <div className={classes.wrapper}>
            <div className={classes.image_container}>
               <img src={ex.src} alt=""/>
            </div>

            <div className={classes.content}>
               <h1 className={classes.title}>
                  {card.title}
               </h1>

               <div className={classes.date}>
                  {card.date.toDateString()}
               </div>

               <div className={classes.subTitle_container}>
                  {card.subTitle}
               </div>

               <div className={classes.btn_container}>
                  <Button type={'black'}>
                     Подробнее
                  </Button>
               </div>
            </div>
         </div>
      </div>
   )
}

export default BlogCard