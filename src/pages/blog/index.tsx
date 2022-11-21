import {FC} from "react"
import classes from './Blog.module.sass'
import back from "../../public/images/back.jpg";
import MainBack from "@components/MainBack/MainBack";
import {CardType} from "../../types/card";
import List from "@components/Lists/List/List";
import useMedia from "../../hooks/useMedia";
import BackImg from "@components/BackImg/BackImg";


const Blog: FC = () => {
   const { isSmallLaptop } = useMedia()

   return (
      <div className={classes.container}>
         { isSmallLaptop && <BackImg imageSrc={back.src}/> }

         <MainBack
            title={'Blog/ Как говориться сложно срать стоя на руках и не испачкать спину'}
            imageSrc={back.src}
            transparent={isSmallLaptop}
         />

         <div className={classes.wrapper}>
            { isSmallLaptop && <div className={classes.wrapper_back}/> }

            <List
               pageNav={true}
               title={'Блог'}
               cardType={'big'}
               colorSchema='black'
               firstBig
               length={5}
               cardName={CardType.BLOGS}
            />
         </div>
      </div>
   )
}

export default Blog