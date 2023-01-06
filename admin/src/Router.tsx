import {FC} from "react"
import { Routes, Route } from "react-router-dom"
import Home from './containers/Home/Home'
import Blog from "./containers/Blog/Blog"
import EditBlog from "./containers/Blog/EditBlog"
import AddBlog from "./containers/Blog/AddBlog"
import Team from "./containers/Team/Team"
import AddTeam from "./containers/Team/AddTeam"
import EditTeam from "./containers/Team/EditTeam"
import Album from "./containers/Album/Album"
import AddAlbum from "./containers/Album/AddAlbum"
import EditAlbum from "./containers/Album/EditAlbum"
import Event from "./containers/Event/Event"
import AddEvent from "./containers/Event/AddEvent"
import EditEvent from "./containers/Event/EditEvent"
import Hall from "./containers/Hall/Hall";


const Router: FC = () => {
   return (
      <Routes>
         <Route element={<Home/>} path='/' />
         
         <Route element={<Blog/>} path='/blog' />
         <Route element={<AddBlog/>} path='/blog/new' />
         <Route element={<EditBlog/>} path='/blog/:slug' />
         
         <Route element={<Team/>} path='/team' />
         <Route element={<AddTeam/>} path='/team/new' />
         <Route element={<EditTeam/>} path='/team/:slug' />
         
         <Route element={<Album/>} path='/album' />
         <Route element={<AddAlbum/>} path='/album/new' />
         <Route element={<EditAlbum/>} path='/album/:slug' />

         <Route element={<Event/>} path='/event' />
         <Route element={<AddEvent/>} path='/event/new' />
         <Route element={<EditEvent/>} path='/event/:slug' />

         <Route element={<Hall/>} path='/hall' />
      </Routes>
   )
}

export default Router