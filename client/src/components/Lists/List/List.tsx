import {FC} from "react"
import classes from './List.module.sass'
import useNavigation from "../../../hooks/useNavigation";
import MainCard from "@components/Card/MainCard";
import PageNavigation from "@components/Navigation/PageNavigation/PageNavigation";
import {CardType} from "../../../types/card";
import OpacityDiv from "@components/Animations/OpacityDiv";


interface IProps {
   title: string
   colorSchema: 'white' | 'black'
   length?: number
   pageNav: boolean
   cardType: 'small' | 'big'
   cardName: CardType
}

const List: FC<IProps> =
   ({
       title,
       colorSchema = 'black',
       length = 5,
       cardType,
       pageNav = false,
       cardName
   }) => {

      const { page, pagesCount, nextPageHandler, prevPageHandler, elements } = useNavigation(length, cardName)

      const startIdx = (page - 1) * length

      const cls = [classes.container]

      if (colorSchema === 'black')
         cls.push(classes.black)

      if (colorSchema === 'white')
         cls.push(classes.white)

      return (
         <div className={cls.join(' ')}>
            <OpacityDiv
               className={classes.title}
               whileInViewport
               delay={0}
            >
               {title}
            </OpacityDiv>

            {elements.length > 0 ? (
               <div className={classes.list}>
                  {elements.slice(startIdx, startIdx + length).map((el, i) => (
                     <MainCard
                        key={i + el.to}
                        colorSchema={colorSchema}
                        title={el.title}
                        text={el.text}
                        to={el.to}
                        photoSrc={el.photoSrc}
                        date={el.date}
                        type={cardType}
                        beforeTitle={el.beforeTitle}
                     />
                  ))}
               </div>
            ) : (
               <OpacityDiv className={classes.empty_list}>
                  <h1>Поки що елементів не додано</h1>
               </OpacityDiv>
            )}

            { (pageNav && pagesCount > 1) && (
               <PageNavigation
                  nextPageClick={nextPageHandler}
                  prevPageClick={prevPageHandler}
                  page={page}
                  pagesCount={pagesCount}
               />
            ) }
         </div>
      )
   }

export default List