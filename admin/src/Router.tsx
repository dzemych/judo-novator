import {FC} from "react";
import { Routes, Route } from "react-router-dom";
import Home from './containers/Home/Home'


const Router: FC = () => {
   return (
      <Routes>
         <Route element={<Home/>} path={'/'} />
      </Routes>
   )
}

export default Router