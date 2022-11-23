import {FC} from "react";
import {Link, Typography} from "@mui/material";


type IProps = {
   [i: string]: any
}

const Footer: FC<IProps> = props => {
   return (
      <Typography
         variant="body2"
         color="text.secondary"
         align="center"
         sx={{ pb: 3 }}
         {...props}
      >
         {'Copyright © '}
         <Link color="inherit" href="https://www.linkedin.com/in/dzemych/">
            Dzemych Ivan
         </Link>
         {` ${new Date().getFullYear()}.`}
      </Typography>
   )
}

export default Footer