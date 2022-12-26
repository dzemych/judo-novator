import Container from "@mui/material/Container"
import {FC} from "react"


const FormsBaseLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
   return <Container
      sx={{
         display: 'flex',
         flexDirection: 'column',
         alignItems: 'center',
         mt: 2,
      }}
   >
      { children }
   </Container>
}

export default FormsBaseLayout