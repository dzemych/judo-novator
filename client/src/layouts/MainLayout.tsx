import { FC } from 'react'
import Header from '../components/Navigation/Header/Header'
import Footer from '@components/./Navigation/Footer/Footer'
import classes from './MainLayout.module.sass'


interface IProps {
   children: React.ReactNode
}

const MainLayout: FC<IProps> = ({ children }) => {

   return (
      <div className={classes.container}>
         <Header/>

         {children}

         <Footer/>
      </div>
   )
}

export default MainLayout