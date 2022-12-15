import React, {FC} from "react"
import {Container} from "@mui/material"
import {CollectionType} from "../../types/collection"
import FormsBase from "../../components/forms/FormsBase"
import ArticleForms from "../../components/forms/ArticleForms/ArticleForms"


const AddBlog: FC = () => {

   return (
      <Container
         sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mt: 2,
         }}
      >
         <FormsBase
            collectionType={CollectionType.BLOG}
            title={'Додайте новий блог'}
            type={'create'}
            // @ts-ignore
            // Props will be added in this component (this was made for not repeating all submit
            // actions and status states that invokes different popup based on forms answer)
            children={<ArticleForms/>}
         />
      </Container>
   )
}

export default AddBlog