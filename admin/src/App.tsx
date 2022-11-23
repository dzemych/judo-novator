import React, {FC} from 'react'
import {BrowserRouter} from "react-router-dom";
import Router from "./Router";
import MainLayout from "./components/MainLayout";


const App: FC = () => {
   return (
      <MainLayout>
         <main>
            <BrowserRouter>
               <Router/>
            </BrowserRouter>
         </main>
      </MainLayout>
   )
}

export default App