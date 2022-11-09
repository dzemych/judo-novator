import {FC} from "react";
import classes from './BlogsList.module.sass'
import MainCard from "@components/Card/MainCard";
import ex from "@images/ex.jpg";
import exTwo from "@images/ex2.jpeg";
import back from "@images/back.jpg";


interface IProps {
   title: string
   colorSchema: 'white' | 'black'
   length?: number
   cardType: 'small' | 'big'
}

const BlogsList: FC<IProps> =
   ({
       title,
       colorSchema = 'black',
       length = 5,
       cardType
   }) => {
   const cards: ICard[] = [
      {
         to: '/',
         title: 'Some super super mooper title',
         date: new Date(),
         text: 'Sub title with super description Sub title with super description and other imp stuff',
         photoSrc: ex.src,
         // beforeTitle: '65 Photographs'
      },
      {
         to: '/halls',
         title: 'Some super super mooper title Some super super mooper titleSome super super mooper title',
         date: new Date(),
         text: 'Sub title with super description Sub title with super description and other imp stuff',
         photoSrc: exTwo.src,
         beforeTitle: '65 Photographs'
      },
      {
         to: '/teams',
         title: 'Some super super mooper title',
         date: new Date(),
         text: 'sfasdaf sdfjklsd fjkdsjf kldsjfk sdfkjfsf jsdklfj',
         photoSrc: back.src
      },
      {
         to: '/teams',
         title: 'Some super super mooper title',
         date: new Date(),
         text: 'sfasdaf sdfjklsd fjkdsjf kldsjfk sdfkjfsf jsdklfj',
         photoSrc: back.src
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
                  text={el.text}
                  to={el.to}
                  photoSrc={el.photoSrc}
                  date={el.date}
                  type={cardType}
                  beforeTitle={el.beforeTitle}
               />
            ))}
         </div>
      </div>
   )
}

export default BlogsList