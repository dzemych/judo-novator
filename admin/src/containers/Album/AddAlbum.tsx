import React, {FC} from "react";
import FormsBaseLayout from "../../components/forms/FormsBaseLayout";
import {CollectionType} from "../../types/collection";
import FormsBase from "../../components/forms/FormsBase";
import AlbumForms from "../../components/forms/AlbumForms/AlbumForms";


const AddAlbum: FC = () => {
   return (
      <FormsBaseLayout>
         <FormsBase
            key={'album-add'}
            collectionType={CollectionType.ALBUM}
            title={'Додайте новий альбом'}
            type={'create'}
            // @ts-ignore
            // Props will be added in this component (this was made for not repeating all submit
            // actions and status states that invokes different popup based on forms answer)
            children={<AlbumForms/>}
         />
      </FormsBaseLayout>
   )
}

export default AddAlbum