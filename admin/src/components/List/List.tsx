import {FC, useEffect, useState} from "react";
import {FormControl, Grid, Input, InputAdornment, InputLabel} from "@mui/material";
import {CardType, ICardItem} from "../../types/card";
import SearchIcon from '@mui/icons-material/Search';
import ListItem from "../ListItem/ListItem";
import useNavigation from "../../hooks/useNavigation";
import PageNavigation from "../Navigation/PageNavigation/PageNavigation";
import ItemSkeleton from "../ListItem/Skeleton";
import SortBar from "./SortBar";


interface IProps {
   type: CardType
}

const initSort = {
   createdAt: -1
}

const List: FC<IProps> = ({type}) => {

   const [searchState, setSearchState] = useState('')
   const [sortState, setSortState] = useState(initSort)
   const {
      elements,
      nextPageHandler,
      prevPageHandler,
      page,
      pagesCount,
      loading,
      changeParams,
   } = useNavigation(10, type, '&sort=-createdAt')

   const mockItem: ICardItem = {
      slug: 'new',
      mainPhoto: '',
      title: 'xxx',
      beforeTitle: 'xxx',
      text: 'xxx'
   }

   useEffect(() => {
      const sortVal = Object.keys(sortState).reduce((acc, key, i, arr) => {
         const sign = sortState[key as keyof typeof sortState] > 0 ? '' : '-'
         const comma = i < arr.length - 1 ? ',' : ''

         acc = acc + sign + key + comma

         return acc
      }, '')

      let paramsObj = {
         sort: sortVal
      }

      if (searchState) {
         // @ts-ignore
         paramsObj['title[regex]'] = searchState
      }

      if (!loading && sortState) {
         changeParams(paramsObj)
      }
   }, [searchState, sortState])

   return (
      <div style={{
         width: '100%',
         display: 'flex',
         flexDirection: 'column',
      }}>
         <FormControl fullWidth sx={{m: 1}} variant="standard">
            <InputLabel htmlFor="standard-adornment-amount">Пошук за назвою</InputLabel>
            <Input
               id="standard-adornment-amount"
               value={searchState}
               onChange={e => setSearchState(e.target.value)}
               startAdornment={<InputAdornment position="start" style={{cursor: 'pointer'}}>
                  <SearchIcon/>
               </InputAdornment>}
            />
         </FormControl>

         <SortBar state={sortState} setState={setSortState}/>

         <Grid
            container
            spacing={2}
            sx={{width: '100%'}}
            alignItems='center'
         >
            <ListItem
               card={mockItem}
               cardType={type}
               mock={1}
            />

            {loading && [0, 1, 2].map(el => <ItemSkeleton key={el}/>)}

            {!loading && elements.map((el, i) =>
               <ListItem
                  cardType={type}
                  card={el}
                  key={el.slug + i}
               />
            )}

            <PageNavigation
               nextPageClick={nextPageHandler}
               prevPageClick={prevPageHandler}
               page={page}
               pagesCount={pagesCount}
               disable={loading}
            />
         </Grid>
      </div>
   )
}

export default List