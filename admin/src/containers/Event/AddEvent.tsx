import React from "react"
import FormsBase from "../../components/forms/FormsBase"
import {CollectionType} from "../../types/collection"
import ArticleForms from "../../components/forms/ArticleForms/ArticleForms"
import FormsBaseLayout from "../../components/forms/FormsBaseLayout"


const AddEvent = () => {
   return (
      <FormsBaseLayout>
         <FormsBase
            key={'event-add'}
            collectionType={CollectionType.EVENT}
            title={'Додайте нову подію'}
            type={'create'}
            // @ts-ignore
            // Props will be added in this component (this was made for not repeating all submit
            // actions and status states that invokes different popup based on forms answer)
            children={<ArticleForms/>}
         />
      </FormsBaseLayout>
   )
}

export default AddEvent