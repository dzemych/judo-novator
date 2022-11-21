import {FC} from "react"
import classes from './Album.module.sass'
import back from "../../public/images/back.jpg";
import MainBack from "@components/MainBack/MainBack";
import List from "@components/Lists/List/List";
import {CardType} from "../../types/card";
import BackImg from "@components/BackImg/BackImg";
import useMedia from "../../hooks/useMedia";


const Album: FC = () => {

   const { isSmallLaptop } = useMedia()

   return (
      <div className={classes.container}>
         { isSmallLaptop && <BackImg imageSrc={back.src}/> }

         <MainBack
            title={'Albums/ Как говориться сложно срать стоя на руках и не испачкать спину'}
            imageSrc={back.src}
            transparent={isSmallLaptop}
         />

         <div className={classes.wrapper}>
            { isSmallLaptop && <div className={classes.wrapper_back}/> }

            <List
               pageNav={true}
               title={'Наша галерея'}
               cardType='big'
               colorSchema='black'
               firstBig={true}
               length={5}
               cardName={CardType.ALBUMS}
            />
         </div>
      </div>
   )
}

export default Album