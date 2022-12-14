import React, {FC} from "react";
import {Container} from "@mui/material";
import {CollectionType} from "../../types/collection";
import ArticleForms from "../../components/ItemForms/ArticleForms";
import ItemLayout from "../../layout/ItemLayout";


const EditBlog: FC = () => {
   return (
      <Container>
         <ItemLayout
            collectionType={CollectionType.BLOG}
            title={'Блог'}
            type={'update'}
            // @ts-ignore
            // Props will be added in this component (this was made for not repeating all submit
            // actions and status states that invokes different popup based on forms answer)
            children={<ArticleForms/>}
         />
      </Container>
   )
}

export default EditBlog