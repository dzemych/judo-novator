import React, {FC} from "react";
import FormsBase from "../../components/forms/FormsBase";
import {CollectionType} from "../../types/collection";
import {Container} from "@mui/material";
import TeamForms from "../../components/forms/TeamForms/TeamForms";


const AddTeam: FC = () => {
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
            collectionType={CollectionType.TEAM}
            title={'Додайте нову людину'}
            type={'create'}
            // @ts-ignore
            // Props will be added in this component (this was made for not repeating all submit
            // actions and status states that invokes different popup based on forms answer)
            children={<TeamForms/>}
         />
      </Container>
   )
}

export default AddTeam