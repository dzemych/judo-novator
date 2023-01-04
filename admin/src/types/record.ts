import {CollectionType} from "./collection";


export interface IRecordContext {
   collectionType: CollectionType
   recordType: 'update' | 'create'
}