import {FC} from "react";
import classes from './ListCards.module.sass'
import Card from "@components/Card/Card";


interface IProps {
   list: string[],
   title: string
}

const ListCards: FC<IProps> = ({ list, title }) => {
   return (
      <div className={classes.container}>
         <h2 className={classes.title}>
            {title}
         </h2>

         {list.map((el, i) => (
            <Card
               key={i}
               title={'Some card title'}
            />
         ))}
      </div>
   )
}

export default ListCards