import {FC} from "react"
import classes from './Team.module.sass'
import back from "../../public/images/back.jpg";
import StarringBack from "@components/StarringBack/StarringBack";


const Team: FC = () => {
   return (
      <div className={classes.container}>
         <StarringBack
            title={'Events/ Как говориться сложно срать стоя на руках и не испачкать спину'}
            imageSrc={back.src}
         />

         <div className={classes.wrapper}>

         </div>
      </div>
   )
}

export default Team