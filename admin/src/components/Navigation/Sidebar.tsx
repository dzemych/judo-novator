import React, {FC} from "react";
import {Divider, IconButton, List, styled, Toolbar} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MuiDrawer from '@mui/material/Drawer'
import {mainListItems} from "./listItems"
import {DrawerProps as MuiDrawerProps} from "@mui/material/Drawer/Drawer"


interface IProps {
   open: boolean
   toggleDrawer: () => void
   drawerWidth: number
}

interface DrawerProps extends MuiDrawerProps {
   open?: boolean
   drawerWidth: number
}

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})<DrawerProps>(
   ({theme, open, drawerWidth}) => ({
      '& .MuiDrawer-paper': {
         position: 'relative',
         whiteSpace: 'nowrap',
         width: drawerWidth,
         transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
         }),
         boxSizing: 'border-box',
         ...(!open && {
            overflowX: 'hidden',
            transition: theme.transitions.create('width', {
               easing: theme.transitions.easing.sharp,
               duration: theme.transitions.duration.leavingScreen,
            }),
            width: theme.spacing(7),
            [theme.breakpoints.up('sm')]: {
               width: theme.spacing(9),
            },
         }),
      },
   }),
)

const Sidebar: FC<IProps> = ({ open, toggleDrawer, drawerWidth }) => {
   return (
      <Drawer variant="permanent" open={open} drawerWidth={drawerWidth}>
         <Toolbar
            sx={{
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'flex-end',
               px: [1],
            }}
         >
            <IconButton onClick={toggleDrawer}>
               <ChevronLeftIcon/>
            </IconButton>
         </Toolbar>

         <Divider/>

         <List component="nav">
            {mainListItems}

            <Divider sx={{my: 1}}/>
         </List>
      </Drawer>
   )
}

export default Sidebar