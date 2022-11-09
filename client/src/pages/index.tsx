import type { NextPage } from 'next'
import classes from 'src/pages/Home.module.sass'
import MainBack from "@components/MainBack/MainBack";
import back from '../public/images/back.jpg'
import ex from '@images/ex.jpg'
import exTwo from '@images/ex2.jpeg'
import BlogsList from "@components/BlogList/BlogsList";
import WideSlider from "@components/WideSlider/WideSlider";
import AlbumsList from "@components/AlbumList/AlbumsList";
import PersonSmallList from "@components/PersonSmallList/PersonSmallList";


const Home: NextPage = () => {
   const slider: ISliderElement[] = [
      { title: 'First title', url: '/teams', photoSrc: back.src },
      { title: 'Second title', url: '/', photoSrc: ex.src },
      { title: 'Third title', url: '/about', photoSrc: exTwo.src }
   ]

   return (
      <div className={classes.container}>
         <MainBack
            title={'Main/ Как говориться сложно срать стоя на руках и не испачкать спину'}
            imageSrc={back.src}
         />
         
         <div className={classes.wrapper}>
            <BlogsList
               title={'Blog'}
               colorSchema={'white'}
               cardType={'small'}
            />

            <div className={classes.empty_space}/>

            <WideSlider elements={slider}/>

            <div className={classes.empty_space}/>

            <AlbumsList
               title={'Albums'}
               colorSchema={'white'}
               cardType={'small'}
            />

            <div className={classes.empty_space}/>

            <PersonSmallList title={'Our team'} length={4} colorSchema={'white'}/>
         </div>
      </div>
   )
}

export default Home