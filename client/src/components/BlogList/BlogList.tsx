import {FC} from "react";
import classes from './BlogList.module.sass'
import BlogCard from "@components/BlogCard/BlogCard";
import {IBlogCard} from "../../types/IBlogCard";


interface IProps {
   list: IBlogCard[],
   title: string
   type: 'white' | 'black'
}

const BlogList: FC<IProps> = ({ list, title, type= 'black' }) => {
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
               <BlogCard
                  key={i}
                  card={el}
                  type={type}
               />
            ))}
         </div>
      </div>
   )
}

export default BlogList