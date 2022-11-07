import type { NextPage } from 'next'
import classes from 'src/pages/Home.module.sass'
import StarringBack from "@components/StarringBack/StarringBack";
import back from '../public/images/back.jpg'
import ex from '@images/ex.jpg'
import exTwo from '@images/ex2.jpeg'
import BlogsList from "@components/BlogList/BlogsList";
import WideSlider from "@components/WideSlider/WideSlider";


const Home: NextPage = () => {
   const cards = [
      {
         to: '/',
         title: 'Some super super mooper title',
         date: new Date(),
         text: 'Sub title with super description Sub title with super description and other imp stuff',
         photoSrc: ex.src
      },
      {
         to: '/halls',
         title: 'Some super super mooper title',
         date: new Date(),
         text: 'Sub title with super description Sub title with super description and other imp stuff',
         photoSrc: exTwo.src
      },
      {
         to: '/teams',
         title: 'Some super super mooper title',
         date: new Date(),
         text: 'Sub title with super description Sub title with super description and other imp stuff',
         photoSrc: back.src
      },
      {
         to: '/teams',
         title: 'Some super super mooper title',
         date: new Date(),
         text: 'Sub title with super description Sub title with super description and other imp stuff',
         photoSrc: back.src
      },
   ]

   const slider: ISliderElement[] = [
      { title: 'First title', url: '/teams', photoSrc: back.src },
      { title: 'Second title', url: '/', photoSrc: ex.src },
      { title: 'Third title', url: '/about', photoSrc: exTwo.src }
   ]

   return (
      <div className={classes.container}>
         <StarringBack
            title={'Main/ Как говориться сложно срать стоя на руках и не испачкать спину'}
            imageSrc={back.src}
         />
         
         <div className={classes.wrapper}>
            <WideSlider elements={slider}/>

            <div className={classes.blogList}>
               <BlogsList list={cards} title={'Blog'} type={'white'}/>
            </div>
         </div>
      </div>
   )
}

export default Home