import {FC} from "react";
import { Routes, Route } from "react-router-dom";
import Home from './containers/Home/Home'
import Blog from "./containers/Blog/Blog";
import EditBlog from "./containers/Blog/EditBlog";
import AddBlog from "./containers/Blog/AddBlog";
import Team from "./containers/Team/Team";


const Router: FC = () => {
   return (
      <Routes>
         <Route element={<Home/>} path='/' />
         <Route element={<Blog/>} path='/blog' />
         <Route element={<AddBlog/>} path='/blog/new' />
         <Route element={<EditBlog/>} path='/blog/:slug' />
         <Route element={<Team/>} path='/team' />
      </Routes>
   )
}

export default Router