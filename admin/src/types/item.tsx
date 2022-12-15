import {CollectionType} from "./collection";

export interface ItemFormProps {
   collectionType: CollectionType
   submitHandler: (formData: FormData) => void
   type: 'update' | 'create'
   deleteHandler: () => void
   item?: any
}