import {FC} from "react";
import classes from './BackImg.module.sass'


interface IProps {
   imageSrc: string
}

const BackImg: FC<IProps> = ({ imageSrc }) => {
   return (
      <div className={classes.container}>
         <div className={classes.shadow}/>
         <img src={imageSrc} alt=""/>
      </div>
   )
}

export default BackImg