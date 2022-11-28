import {useMediaQuery, useTheme} from "@mui/material";


type IMedia = () => { isLaptop: boolean }

const useMedia: IMedia = () => {
   const theme = useTheme()

   const isLaptop = useMediaQuery(theme.breakpoints.up('md'))

   return { isLaptop }
}

export default useMedia