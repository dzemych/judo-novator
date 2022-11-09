import {FC} from "react"
import classes from './PersonSmallCard.module.sass'
import AnimatedImg from "@components/Animations/AnimatedImg";
import OpacityYDiv from "@components/Animations/OpacityYDiv";


interface IProps {
   position: string
   photoSrc: string
}

const PersonSmallCard: FC<IProps> = ({ position, photoSrc }) => {
   return (
      <div className={classes.container}>
         <div className={classes.wrapper}>
            <div className={classes.img_container}>
               <AnimatedImg photoSrc={photoSrc} whileInViewport/>
            </div>

            <OpacityYDiv className={classes.position} delay={.2} whileInViewport>
               {position}
            </OpacityYDiv>
         </div>
      </div>
   )
}

export default PersonSmallCard