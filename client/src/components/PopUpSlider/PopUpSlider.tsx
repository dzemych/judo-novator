import {FC, useEffect, useState} from "react";
import classes from './PopUpSlider.module.sass'


interface IProps {

}

const PopUpSlider: FC<IProps> = ({  }) => {
   const [page, setPage] = useState(0)

   useEffect(() => {
      document.body.style.overflow = 'hidden'

      return () => {
         document.body.style.overflow = 'auto'
      }
   }, [])

   return (
      <div className={classes.container}>


         <div className={classes.wrapper}>
            <h1>Fucking slider</h1>
         </div>
      </div>
   )
}

export default PopUpSlider