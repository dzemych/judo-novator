import type {NextPage} from 'next'
import classes from 'src/pages/Home.module.sass'
import MainBack from "@components/MainBack/MainBack";
import back from '../public/images/back.jpg'
import WideSlider from "@components/WideSlider/WideSlider";
import PersonSmallList from "@components/Lists/PersonSmallList/PersonSmallList";
import List from "@components/Lists/List/List";
import {CardType} from "../types/card";
import {ISliderElement} from "../types/ISliderElement";


const Home: NextPage = () => {
   const slider: ISliderElement[] = [
      { title: 'First title', url: '/teams', photoSrc: back.src },
   ]

   return (
      <div className={classes.container}>
         <MainBack
            title={'Main/ Как говориться сложно срать стоя на руках и не испачкать спину'}
            imageSrc={back.src}
         />
         
         <div className={classes.wrapper}>
            <div className={classes.list_wrapper}>
               <List
                  title={'Blog'}
                  colorSchema={'white'}
                  cardType={'small'}
                  cardName={CardType.BLOGS}
                  pageNav={false}
                  length={4}
               />
            </div>

            <div className={classes.slider_wrapper}>
               <WideSlider elements={slider}/>
            </div>

            <div className={classes.list_wrapper}>
               <List
                  title={'Albums'}
                  colorSchema={'white'}
                  cardType={'small'}
                  cardName={CardType.ALBUMS}
                  pageNav={false}
               />
            </div>

            <div className={classes.empty_space}/>

            <PersonSmallList title={'Our team'} length={4} colorSchema={'white'}/>
         </div>
      </div>
   )
}

export default Home