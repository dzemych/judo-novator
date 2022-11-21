import {FC} from "react"
import classes from './Team.module.sass'
import back from "../../public/images/back.jpg";
import MainBack from "@components/MainBack/MainBack";
import List from "@components/Lists/List/List";
import {CardType} from "../../types/card";
import BackImg from "@components/BackImg/BackImg";
import useMedia from "../../hooks/useMedia";


const Team: FC = () => {
   const { isSmallLaptop } = useMedia()

   return (
      <div className={classes.container}>
         { isSmallLaptop && <BackImg imageSrc={back.src}/> }

         <MainBack
            title={'Events/ Как говориться сложно срать стоя на руках и не испачкать спину'}
            imageSrc={back.src}
            transparent={isSmallLaptop}
         />

         <div className={classes.wrapper}>
            { isSmallLaptop && <div className={classes.wrapper_back}/> }

            <List
               title={'Наша команда'}
               colorSchema={'black'}
               pageNav={true}
               cardType={'big'}
               cardName={CardType.TEAM}
               length={2}
            />
         </div>
      </div>
   )
}

export default Team