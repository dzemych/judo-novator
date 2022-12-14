import {FC} from "react";
import List from "../../components/List/List";
import {CardType} from "../../types/card";
import ListLayout from "../../layout/ListLayout";


const Blog: FC = () => {

   return (
      <ListLayout title={'Блог'}>
         <List type={CardType.BLOGS}/>
      </ListLayout>
   )
}

export default Blog