import React, {FC} from "react";
import {CollectionType} from "../../types/collection";
import FormsBase from "../../components/forms/FormsBase";
import FormsBaseLayout from "../../components/forms/FormsBaseLayout";
import ArticleForms from "../../components/forms/ArticleForms/ArticleForms";


const EditBlog: FC = () => {
   return (
      <FormsBaseLayout>
         <FormsBase
            key={'blog-edit'}
            collectionType={CollectionType.BLOG}
            title={'Блог'}
            type={'update'}
            // @ts-ignore
            // Props will be added in this component (this was made for not repeating all submit
            // actions and status states that invokes different popup based on forms answer)
            children={<ArticleForms/>}
         />
      </FormsBaseLayout>
   )
}

export default EditBlog