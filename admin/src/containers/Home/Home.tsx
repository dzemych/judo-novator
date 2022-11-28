import {FC} from "react";
import { Container, Typography} from "@mui/material";


const Home: FC = () => {
   return (
      <Container maxWidth="sm" sx={{ background: '#F5F5F5', height: '200vh' }}>
         <Typography variant='h2' color='textPrimary' align='center' gutterBottom>
            Main page
         </Typography>
      </Container>
   )
}

export default Home