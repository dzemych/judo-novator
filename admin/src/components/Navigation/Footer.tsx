import {FC} from "react";
import {Link, Typography, useTheme} from "@mui/material";


type IProps = {
   [i: string]: any
}

const Footer: FC<IProps> = props => {

   const theme = useTheme()

   return (
      <Typography
         variant="body1"
         color="text.secondary"
         align="center"
         sx={{ padding: theme.spacing(5, 0, 3, 0) }}
      >
         {'Copyright © '}
         <Link color="inherit" href="https://www.linkedin.com/in/dzemych/" target="_blank">
            Dzemych Ivan
         </Link>
         {` ${new Date().getFullYear()}.`}
      </Typography>
   )
}

export default Footer