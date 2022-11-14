import {FC} from "react"
import classes from './PersonSmallList.module.sass'
import PersonSmallCard from "@components/Card/PersonSmallCard";
import useNavigation from "../../../hooks/useNavigation";
import {CardType} from "../../../types/card";
import OpacityDiv from "@components/Animations/OpacityDiv";


interface IProps {
   title: string,
   length?: number
   colorSchema?: 'white' | 'black'
}

const PersonSmallList: FC<IProps> =
   ({
       title,
       colorSchema= 'black',
       length = 5,
   }) => {

   const { elements } = useNavigation(length, CardType.TEAM)

   const cls = [classes.container]

   if (colorSchema === 'white')
      cls.push(classes.white)

   if (colorSchema === 'black')
      cls.push(classes.black)

   return (
      <div className={cls.join(' ')}>
         <OpacityDiv
            className={classes.title}
            whileInViewport
            delay={0}
         >
            <h3>{title}</h3>
         </OpacityDiv>

         <div className={classes.list}>
            {elements.slice(0, length).map((el, i) => (
               <PersonSmallCard
                  key={i + el.to}
                  photoSrc={el.photoSrc}
                  position={el.title}
               />
            ))}
         </div>
      </div>
   )
}

export default PersonSmallList