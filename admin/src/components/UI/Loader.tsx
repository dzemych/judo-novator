import {FC} from "react";
import {CircularProgress} from "@mui/material";


const Loader: FC = () => {
   return (
      <div style={{
         width: '100%',
         height: '100%',
         display: 'flex',
         justifyContent: 'center',
         alignItems: 'center'
      }}>
         <CircularProgress/>
      </div>
   )
}

export default Loader