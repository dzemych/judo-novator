import {FC} from "react";
import classes from '../styles/NotFound.module.sass'


const Custom404: FC = () => {
   return (
      <div className={classes.container}>
         <h1 className={classes.title}>
            Сторінку не найдено
         </h1>

         <hr className={classes.hr}/>

         <h2 className={classes.title}>
            404
         </h2>
      </div>
   )
}

export default Custom404