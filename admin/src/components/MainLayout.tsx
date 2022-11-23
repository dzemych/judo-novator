import React, {FC, useState} from "react"
import {
   Box,
   createTheme,
   CssBaseline,
   ThemeProvider,
   Toolbar,
} from "@mui/material"
import Footer from "./Navigation/Footer";
import Header from "./Navigation/Header";
import Sidebar from "./Navigation/Sidebar";


interface IProps {
   children: React.ReactNode
}

const drawerWidth: number = 240

const mdTheme = createTheme()

const MainLayout: FC<IProps> = ({ children }) => {
   const [open, setOpen] = useState(false)
   const toggleDrawer = () => {
      setOpen(prev => !prev)
   }

   return (
      <ThemeProvider theme={mdTheme}>
         <Box sx={{display: 'flex'}}>
            <CssBaseline/>

            <Header
               drawerWidth={drawerWidth}
               open={open}
               toggleDrawer={toggleDrawer}
            />

            <Sidebar
               open={open}
               toggleDrawer={toggleDrawer}
               drawerWidth={drawerWidth}
            />

            <Box
               component="main"
               sx={{
                  backgroundColor: (theme) =>
                     theme.palette.mode === 'light'
                        ? theme.palette.grey[100]
                        : theme.palette.grey[900],
                  flexGrow: 1,
                  height: '100vh',
                  overflow: 'auto',
               }}
            >
               <Toolbar/>

               {children}

               <Footer sx={{pt: 4}}/>
            </Box>
         </Box>
      </ThemeProvider>
   )
}

export default MainLayout