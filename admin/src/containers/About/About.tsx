import FormsBase from "../../components/forms/FormsBase"
import {CollectionType} from "../../types/collection"
import FormsBaseLayout from "../../components/forms/FormsBaseLayout"
import React from "react"
import AboutForms from "../../components/forms/AboutForms/AboutForms"


const About = () => {
   return (
      <FormsBaseLayout>
         <FormsBase
            key={'about-edit'}
            collectionType={CollectionType.ABOUT}
            title={'О нас'}
            type={'update'}
            // @ts-ignore
            // Props will be added in this component (this was made for not repeating all submit
            // actions and status states that invokes different popup based on forms answer)
            children={<AboutForms/>}
         />
      </FormsBaseLayout>
   )
}

export default About