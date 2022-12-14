import React, {FC} from "react";
import FormsBase from "../../components/forms/FormsBase";
import {CollectionType} from "../../types/collection";
import TeamForms from "../../components/forms/TeamForms/TeamForms";
import FormsBaseLayout from "../../components/forms/FormsBaseLayout";


const AddTeam: FC = () => {
   return (
      <FormsBaseLayout>
         <FormsBase
            key={'team-add'}
            collectionType={CollectionType.TEAM}
            title={'Додайте нову людину'}
            type={'create'}
            // @ts-ignore
            // Props will be added in this component (this was made for not repeating all submit
            // actions and status states that invokes different popup based on forms answer)
            children={<TeamForms/>}
         />
      </FormsBaseLayout>
   )
}

export default AddTeam