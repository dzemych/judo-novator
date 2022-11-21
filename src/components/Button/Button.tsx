import {FC} from "react"
import classes from './Button.module.sass'


interface IProps {
   children: string | React.ReactNode,
   type: 'white' | 'black',
   onClick?: () => void
}


const Button: FC<IProps> =
   ({
       children,
       type= 'white',
       onClick
   }) => {

   const cls = [classes.container]

   if (type === 'black')
      cls.push(classes.black)

   if (type === 'white')
      cls.push(classes.white)

   return (
      <button
         className={cls.join(' ')}
         onClick={onClick}
      >
         <span>
            {children}
         </span>
      </button>
   )
}

export default Button