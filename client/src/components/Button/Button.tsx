import {FC} from "react"
import classes from './Button.module.sass'


interface IProps {
   children: string | React.ReactNode,
   type?: string,
   onClick?: () => void
}


const Button: FC<IProps> =
   ({
       children,
       type,
       onClick
   }) => {

   const cls = [classes.container, classes.mat]

   return (
      // <div className={cls.join(' ')}>
         <button
            className={cls.join(' ')}
            onClick={onClick}
         >
            <span>
               {children}
            </span>
            {/*Xenization*/}
         </button>
      // </div>
   )
}

export default Button