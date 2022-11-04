import {FC} from "react";
import classes from './BlogListCard.module.sass'
import BlogCard from "@components/BlogCard/BlogCard";
import {IBlogCard} from "../../types/IBlogCard";


interface IProps {
   list: IBlogCard[],
   title: string
   type?: string
}

const BlogListCard: FC<IProps> = ({ list, title, type }) => {

   return (
      <div className={classes.container}>
         <h2
            className={classes.title}
            style={{
               color: type === 'white' ? 'white' : 'black'
            }}
         >
            {title}
         </h2>

         <div className={classes.list}>
            {list.map((el, i) => (
               <BlogCard
                  key={i}
                  card={el}
                  type={'white'}
               />
            ))}
         </div>
      </div>
   )
}

export default BlogListCard