import { FC } from 'react'
import Header from '../components/Navivation/Header/Header'
import Footer from '@components/./Navivation/Footer/Footer'
import classes from './MainLayout.module.sass'


interface IProps {
   children: React.ReactNode
}

const MainLayout: FC<IProps> = ({ children }) => {

   console.log('main rereder')
   return (
      <div className={classes.container}>
         <Header/>

         {children}

         <Footer/>
      </div>
   )
}

export default MainLayout