import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ArticleIcon from '@mui/icons-material/Article';
import GroupIcon from '@mui/icons-material/Group';
import CollectionsIcon from '@mui/icons-material/Collections';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import InfoIcon from '@mui/icons-material/Info';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import PlaceIcon from '@mui/icons-material/Place'
import {Link} from "react-router-dom";
import {FC} from "react";


interface IProps {
   toggleDrawer: (state?: boolean) => void
}

interface ILink {
   to: string
   icon: React.ReactNode
   text: string
}

const ListItems: FC<IProps> = ({ toggleDrawer }) => {
   const list: ILink[] = [
      { to: '/', icon: <DashboardIcon/>, text: 'Головна'},
      { to: '/blog', icon: <ArticleIcon/>, text: 'Блог'},
      { to: '/team', icon: <GroupIcon/>, text: 'Команда'},
      { to: '/album', icon: <CollectionsIcon/>, text: 'Галерея'},
      { to: '/event', icon: <CalendarMonthIcon/>, text: 'Календар'},
      { to: '/hall', icon: <PlaceIcon/>, text: 'Зал'},
      { to: '/about', icon: <InfoIcon/>, text: 'Про нас'},
      { to: '/contact', icon: <PermContactCalendarIcon/>, text: 'Контакти'},
   ]

   const renderLink = (link: ILink, idx: number) => (
      <Link
         to={link.to}
         key={link.to + idx}
         onClick={() => toggleDrawer(false)}
         style={{
            outline: "none",
            textDecoration: 'none',
            color: 'initial',
         }}
      >
         <ListItemButton sx={{ pb: idx === 0 ? 3 : '' }}>
            <ListItemIcon>
               {link.icon}
            </ListItemIcon>

            <ListItemText primary={link.text}/>
         </ListItemButton>
      </Link>
   )

   return (
      <>
         {list.map((link, i) => renderLink(link, i))}
      </>
   )
}

export default ListItems