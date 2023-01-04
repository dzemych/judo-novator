import { createContext } from "react";
import {CollectionType} from "../../types/collection";
import {IRecordContext} from "../../types/record";


const RecordContext = createContext<IRecordContext>({
   collectionType: CollectionType.BLOG,
   recordType: 'create',
})

export default RecordContext