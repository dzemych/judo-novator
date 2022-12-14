import {Dispatch, FC, SetStateAction, useEffect, useState} from "react"
import classes from './SortBar.module.sass'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'


interface IProps {
   state: any
   setState: Dispatch<SetStateAction<any>>
}

type ISortVar = 1 | -1

// interface ISortState {
//    createdAt: ISortVar
// }

const SortBar: FC<IProps> = ({ state, setState }) => {

   // const [sortState, setSortState] = useState<ISortState>(state)

   const changeState = (key: keyof typeof state) => () => {
      // @ts-ignore
      setState(prev => ({ ...prev, [key]: prev[key] > 0 ? -1 : 1 }))
   }

   const sortFields = [
      {
         key: 'createdAt',
         iconUp: <ArrowUpwardIcon/>,
         iconDown: <ArrowDownwardIcon/>,
         text: "Дата створення"
      }
   ]

   // useEffect(() => {
   //    const val = Object.keys(sortState).reduce((acc, key) => {
   //       acc = `${acc}${sortState[key as keyof typeof sortState] > 0 ? '' : '-'}${key},`
   //
   //       return acc
   //    }, '')
   //
   //    setState(val)
   // }, [sortState])

   return (
      <div className={classes.container}>
         <span className={classes.title}>
            Сортувати
         </span>

         <div className={classes.vert_div} style={{ marginRight: 80 }}/>

         {sortFields.map(el => (
            <div key={el.key} className={classes.sort_field}>
               <div className={classes.icon_container} onClick={changeState(el.key as keyof typeof state)}>
                  { state[el.key as keyof typeof state] > 0
                     ? el.iconDown
                     : el.iconUp
                  }
               </div>

               <span>
                  {el.text}
               </span>
            </div>
         ))}

      </div>
   )
}

export default SortBar