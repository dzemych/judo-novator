import {FC} from "react";
import ListLayout from "../../layout/ListLayout";
import List from "../../components/List/List";
import {CardType} from "../../types/card";


const Team: FC = () => {
   return (
      <ListLayout title={"Команда"}>
         <List type={CardType.TEAM}/>
      </ListLayout>
   )
}

export default Team