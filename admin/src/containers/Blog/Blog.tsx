import {FC} from "react";
import {Container, Typography} from "@mui/material";
import List from "../../components/List/List";
import {CardType} from "../../types/card";


const Blog: FC = () => {
   return (
      <Container
         maxWidth="md"
         style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
         }}
      >
         <Typography
            variant='h3'
            color='textPrimary'
            align='center'
            gutterBottom
            sx={{ mt: 3, mb: 2 }}
         >
            Блог
         </Typography>

         <List type={CardType.BLOGS}/>
      </Container>
   )
}

export default Blog