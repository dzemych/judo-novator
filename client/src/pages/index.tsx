import type { NextPage } from 'next'
import classes from 'src/pages/Home.module.sass'
import MainBack from "@components/MainBack/MainBack";
import back from '../public/images/back.jpg'
import BlogListCard from "@components/BlogListCards/BlogListCard";


const Home: NextPage = () => {
   const cards = [
      {
         title: 'Some super super mooper title',
         date: new Date(),
         subTitle: 'Sub title with super description Sub title with super description and other imp stuff'
      },
      {
         title: 'Some super super mooper title',
         date: new Date(),
         subTitle: 'Sub title with super description and other imp sSub title with super description Sub title with super description Sub title with super description tuff'
      }
   ]

   return (
      <div className={classes.container}>
         <MainBack
            title={'Main/ Как говориться сложно срать стоя на руках и не испачкать спину'}
            imageSrc={back.src}
         />
         
         <div className={classes.wrapper}>
            <BlogListCard list={cards} title={'Blog'} type={'white'}/>
         </div>
      </div>
   )
}

export default Home