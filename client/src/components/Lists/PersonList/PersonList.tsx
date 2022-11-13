import {FC} from "react"
import classes from './PersonList.module.sass'
import ex from "@images/ex.jpg";
import exTwo from "@images/ex2.jpeg";
import back from "@images/back.jpg";
import PersonSmallCard from "@components/Card/PersonSmallCard";


interface IProps {
   title: string,
   length?: number
   colorSchema?: 'white' | 'black'
}

const PersonList: FC<IProps> =
   ({
       title,
       colorSchema= 'black',
       length = 5,
   }) => {
      const cards = [
         {
            to: '/',
            photoSrc: ex.src,
            position: 'Developer'
         },
         {
            to: '/teams',
            photoSrc: exTwo.src,
            position: 'Trainer'
         },
         {
            to: '/teams',
            photoSrc: back.src,
            position: 'Doctor'
         },
      ]

      return (
         <div className={classes.container}>
            <h2
               className={classes.title}
               style={{
                  color: colorSchema === 'white'
                     ? '#f5f5f5'
                     : '#0a0a0a'
               }}
            >
               {title}
            </h2>

            <div className={classes.list}>
               {cards.slice(0, length).map((el, i) => (
                  <PersonSmallCard
                     key={i}
                     photoSrc={el.photoSrc}
                     position={el.position}
                  />
               ))}
            </div>
         </div>
      )
   }

export default PersonList