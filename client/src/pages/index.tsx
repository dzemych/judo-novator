import type { NextPage } from 'next'
import classes from 'src/pages/Home.module.sass'
import MainBack from "@components/MainBack/MainBack";
import back from '../public/images/back.jpg'
import Button from "@components/Button/Button";


const Home: NextPage = () => {
   return (
      <div className={classes.container}>
         <MainBack
            title={'Main/ Как говориться сложно срать стоя на руках и не испачкать спину'}
            imageSrc={back.src}
         />
         
         <div className={classes.wrapper}>
            <Button>
               Some
            </Button>
         </div>
      </div>
   )
}

export default Home