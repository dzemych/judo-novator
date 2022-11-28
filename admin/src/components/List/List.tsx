import {FC} from "react";
import {Grid} from "@mui/material";
import {CardType, ICardItem} from "../../types/card";
import ListItem from "../ListItem/ListItem";
import useNavigation from "../../hooks/useNavigation";


interface IProps {
   type: CardType
}

const List: FC<IProps> = ({ type }) => {
   const { elements } = useNavigation(5, type)

   const mockItem: ICardItem = {
      slug: 'new',
      photoSrc: '',
      title: 'xxx',
      beforeTitle: 'xxx',
      text: 'xxx'
   }

   return (
      <Grid container spacing={2} sx={{ width: '100%' }}>
         <ListItem
            card={mockItem}
            cardType={CardType.BLOGS}
            mock={1}
         />

         {elements.map((el, i) =>
            <ListItem
               cardType={type}
               card={el}
               key={el.slug + i}
            />
         )}
      </Grid>
   )
}

export default List