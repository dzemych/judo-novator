import { useRouter } from "next/router"
import {FC} from "react"
import classes from './AlbumItem.module.sass'
import MainBack from "@components/MainBack/MainBack";
import back from '@images/back.jpg'


const AlbumItem: FC = () => {

   const router = useRouter()
   const { id } = router.query

   return (
      <div className={classes.container}>
         <MainBack title={'Album'} imageSrc={back.src}/>

         <h1 className={classes.title}>{id}</h1>
      </div>
   )
}

export default AlbumItem