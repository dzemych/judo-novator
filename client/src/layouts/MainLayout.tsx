import { FC } from 'react'
import Header from '../components/Navivation/Header/Header'
import Footer from '@components/./Navivation/Footer/Footer'
import classes from './MainLayout.module.sass'


interface IProps {
   children: React.ReactNode
}

const MainLayout: FC<IProps> = ({ children }) => {
   return (
      <div className={classes.container}>
         <Header/>

         <main>
            {children}
         </main>

         <Footer/>
      </div>
   )
}

export default MainLayout