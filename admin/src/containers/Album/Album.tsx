import {FC} from "react";
import List from "../../components/List/List";
import {CardType} from "../../types/card";
import ListLayout from "../../layout/ListLayout";


const Album: FC = () => {
   return (
      <ListLayout title={'Альбом'}>
         <List type={CardType.ALBUMS}/>
      </ListLayout>
   )
}

export default Album