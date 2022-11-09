import {FC} from "react"
import classes from './AlbumsList.module.sass'
import ex from "@images/ex.jpg";
import exTwo from "@images/ex2.jpeg";
import back from "@images/back.jpg";
import MainCard from "@components/Card/MainCard";


interface IProps {
   colorSchema?: 'white' | 'black'
   title: string
   cardType: 'big' | 'small'
   length?: number
}

const AlbumsList: FC<IProps> =
   ({
       colorSchema = 'black',
       title,
       cardType,
       length = 5
   }) => {
   const cards: ICard[] = [
      {
         to: '/',
         title: 'Some super super mooper titl mooper title Some super supere',
         date: new Date(),
         photoSrc: ex.src,
         beforeTitle: '65 Photographs'
      },
      {
         to: '/halls',
         title: 'Some super super mooper title Some super super mooper titleSome super super mooper title',
         date: new Date(),
         photoSrc: exTwo.src,
         beforeTitle: '65 Photographs'
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
               <MainCard
                  key={i}
                  colorSchema={colorSchema}
                  title={el.title}
                  to={el.to}
                  photoSrc={el.photoSrc}
                  type={cardType}
                  beforeTitle={el.beforeTitle}
                  showBtn={false}
               />
            ))}
         </div>
      </div>
   )
}

export default AlbumsList