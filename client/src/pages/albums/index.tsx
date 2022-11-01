import {FC} from "react"
import classes from './Albums.module.sass'
import back from "@images/back.jpg";
import MainBack from "@components/MainBack/MainBack";


const Albums: FC = () => {
   return (
      <div className={classes.container}>
         <MainBack
            title={'Albums/ Как говориться сложно срать стоя на руках и не испачкать спину'}
            imageSrc={back.src}
         />

         <div className={classes.wrapper}>

         </div>
      </div>
   )
}

export default Albums