import {FC} from "react"
import classes from './Blog.module.sass'
import back from "../../public/images/back.jpg";
import MainBack from "@components/MainBack/MainBack";
import {CardType} from "../../types/card";
import List from "@components/Lists/List/List";


const Blog: FC = () => {
   return (
      <div className={classes.container}>
         <MainBack
            title={'Blog/ Как говориться сложно срать стоя на руках и не испачкать спину'}
            imageSrc={back.src}
         />

         <div className={classes.wrapper}>
            <List
               pageNav={true}
               title={'Блог'}
               cardType='big'
               colorSchema='black'
               length={5}
               cardName={CardType.BLOGS}
            />
         </div>
      </div>
   )
}

export default Blog