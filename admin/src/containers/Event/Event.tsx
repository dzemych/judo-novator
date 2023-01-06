import {FC} from "react"
import List from "../../components/List/List";
import {CardType} from "../../types/card";
import ListLayout from "../../layout/ListLayout";


const Event: FC = () => {
   return (
      <ListLayout title={'Події'}>
         <List type={CardType.EVENTS}/>
      </ListLayout>
   )
}

export default Event