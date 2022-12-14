import React, {FC} from "react";
import {Container} from "@mui/material";
import {CollectionType} from "../../types/collection";
import ItemLayout from "../../layout/ItemLayout";
import ArticleForms from "../../components/ItemForms/ArticleForms";


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
         <ItemLayout
            collectionType={CollectionType.BLOG}
            title={'Блог'}
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