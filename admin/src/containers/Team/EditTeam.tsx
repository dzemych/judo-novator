import React, {FC} from "react";
import {CollectionType} from "../../types/collection";
import FormsBase from "../../components/forms/FormsBase";
import TeamForms from "../../components/forms/TeamForms/TeamForms";
import FormsBaseLayout from "../../components/forms/FormsBaseLayout";


const EditTeam: FC = () => {
   return (
      <FormsBaseLayout>
         <FormsBase
            key={'team-edit'}
            collectionType={CollectionType.TEAM}
            title={'Редагувати людину'}
            type={'update'}
            // @ts-ignore
            // Props will be added in this component (this was made for not repeating all submit
            // actions and status states that invokes different popup based on forms answer)
            children={<TeamForms/>}
         />
      </FormsBaseLayout>
   )
}

export default EditTeam