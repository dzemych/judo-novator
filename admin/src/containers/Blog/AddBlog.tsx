import {FC} from "react";
import {Container, Typography} from "@mui/material";
import NewItem from "src/components/NewItem/NewItem";


interface IProps {

}

const AddBlog: FC<IProps> = () => {

   return (
      <Container
         sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mt: 2,
            minHeight: '100vh'
         }}
      >
         <Typography
            variant='h4'
            textAlign='center'
            sx={{ mb: 4 }}
         >
            Додайте новий запис до блогу
         </Typography>

         <NewItem/>
      </Container>
   )
}

export default AddBlog