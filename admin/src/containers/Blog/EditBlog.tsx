import {FC} from "react";
import {Container, Typography} from "@mui/material";
import {useParams} from "react-router-dom";


interface IProps {

}

const EditBlog: FC<IProps> = () => {

   const params = useParams()

   return (
      <Container>
         <Typography variant='h3' sx={{ mt: 3, mb: 3 }}>
            Edit Blog {params.slug}
         </Typography>

      </Container>
   )
}

export default EditBlog