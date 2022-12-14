import FormsBase from "../../components/forms/FormsBase";
import {CollectionType} from "../../types/collection";
import FormsBaseLayout from "../../components/forms/FormsBaseLayout";
import React from "react";
import HallForms from "../../components/forms/HallFroms/HallForms";

const Hall = () => {
   return (
      <FormsBaseLayout>
         <FormsBase
            key={'hall-edit'}
            collectionType={CollectionType.HALLS}
            title={'Зал'}
            type={'update'}
            // @ts-ignore
            // Props will be added in this component (this was made for not repeating all submit
            // actions and status states that invokes different popup based on forms answer)
            children={<HallForms/>}
         />
      </FormsBaseLayout>
   )
}

export default Hall