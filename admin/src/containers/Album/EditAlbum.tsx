import React, {FC} from "react";
import FormsBase from "../../components/forms/FormsBase";
import {CollectionType} from "../../types/collection";
import FormsBaseLayout from "../../components/forms/FormsBaseLayout";
import AlbumForms from "../../components/forms/AlbumForms/AlbumForms";


const EditAlbum: FC = () => {
   return (
      <FormsBaseLayout>
         <FormsBase
            key={'album-edit'}
            collectionType={CollectionType.ALBUM}
            title={'Редагувати альбом'}
            type={'update'}
            // @ts-ignore
            // Props will be added in this component (this was made for not repeating all submit
            // actions and status states that invokes different popup based on forms answer)
            children={<AlbumForms/>}
         />
      </FormsBaseLayout>
   )
}

export default EditAlbum