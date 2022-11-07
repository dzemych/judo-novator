import {FC} from "react";
import classes from './BlogsList.module.sass'
import MainCard from "@components/Card/MainCard";


interface IProps {
   list: ICard[],
   title: string
   type: 'white' | 'black'
}

const BlogsList: FC<IProps> = ({ list, title, type= 'black' }) => {
   return (
      <div className={classes.container}>
         <h2
            className={classes.title}
            style={{
               color: type === 'white'
                  ? '#f5f5f5'
                  : '#0a0a0a'
            }}
         >
            {title}
         </h2>

         <div className={classes.list}>
            {list.map((el, i) => (
               <MainCard
                  key={i}
                  colorSchema={'white'}
                  title={el.title}
                  text={el.title}
                  to={el.to}
                  photoSrc={el.photoSrc}
               />
            ))}
         </div>
      </div>
   )
}

export default BlogsList