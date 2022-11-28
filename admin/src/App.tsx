import React, {FC} from 'react'
import {BrowserRouter} from "react-router-dom";
import Router from "./Router";
import MainLayout from "./components/MainLayout";
import 'src/assets/styles/global.sass'


const App: FC = () => {
   return (
      <BrowserRouter>
         <MainLayout>
            <main>
               <Router/>
            </main>
         </MainLayout>
      </BrowserRouter>
   )
}

export default App