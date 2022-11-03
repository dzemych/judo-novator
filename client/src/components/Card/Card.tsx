import {FC} from "react";
import classes from './Card.module.sass'


interface IProps {
   title: string
}

const Card: FC<IProps> = () => {
   return (
      <div className={classes.container}>
         <div className={classes.wrapper}>

         </div>
      </div>
   )
}

export default Card