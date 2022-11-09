import {FC} from "react"
import classes from './Halls.module.sass'
import back from "../../public/images/back.jpg";
import MainBack from "@components/MainBack/MainBack";


const Halls: FC = () => {
   return (
      <div className={classes.container}>
         <MainBack
            title={'Events/ Как говориться сложно срать стоя на руках и не испачкать спину'}
            imageSrc={back.src}
         />

         <div className={classes.wrapper}>

         </div>
      </div>
   )
}

export default Halls