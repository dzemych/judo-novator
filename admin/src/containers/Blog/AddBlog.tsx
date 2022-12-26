import React, {FC} from "react"
import {CollectionType} from "../../types/collection"
import FormsBase from "../../components/forms/FormsBase"
import ArticleForms from "../../components/forms/ArticleForms/ArticleForms"
import FormsBaseLayout from "../../components/forms/FormsBaseLayout";


const AddBlog: FC = () => {

   return (
      <FormsBaseLayout>
         <FormsBase
            key={'blog-add'}
            collectionType={CollectionType.BLOG}
            title={'Додайте новий блог'}
            type={'create'}
            // @ts-ignore
            // Props will be added in this component (this was made for not repeating all submit
            // actions and status states that invokes different popup based on forms answer)
            children={<ArticleForms/>}
         />
      </FormsBaseLayout>
   )
}

export default AddBlog