import {FC} from "react"
import classes from './List.module.sass'
import useNavigation from "../../../hooks/useNavigation";
import MainCard from "@components/Card/MainCard";
import PageNavigation from "@components/Navigation/PageNavigation/PageNavigation";
import {CardType, ICard} from "../../../types/card";
import OpacityDiv from "@components/Animations/OpacityDiv";
import useMedia from "../../../hooks/useMedia";
import Loader from "@components/Loader/Loader";
import {AnimatePresence} from "framer-motion";


interface IProps {
   title: string
   colorSchema: 'white' | 'black'
   length?: number
   pageNav: boolean
   cardType: 'small' | 'big' | 'extraBig'
   firstBig?: boolean
   cardName: CardType
}

const List: FC<IProps> =
   ({
       title,
       colorSchema = 'black',
       length = 5,
       cardType,
       pageNav = false,
       cardName,
       firstBig
   }) => {

      const {
         page,
         pagesCount,
         nextPageHandler,
         prevPageHandler,
         elements,
         loading
      } = useNavigation(length, cardName)

      const { isSmallLaptop } = useMedia()

      const cls = [classes.container]

      if (colorSchema === 'black')
         cls.push(classes.black)

      if (colorSchema === 'white')
         cls.push(classes.white)

      const renderCard = (el: ICard, idx: number) => {
         let newCardType = cardType

         if (
            isSmallLaptop &&
            ( idx === 0 ) &&
            firstBig &&
            ( elements.length > 2 )
         )
            newCardType = 'extraBig'

         return (
            <MainCard
               key={idx + el.to}
               colorSchema={colorSchema}
               title={el.title}
               text={el.text}
               to={el.to}
               photoSrc={el.photoSrc}
               date={el.date}
               type={newCardType}
               beforeTitle={el.beforeTitle}
            />
         )
      }

      const renderList = () => {
         if (elements.length < 1 && !loading) return (
            <OpacityDiv className={classes.empty_list}>
               <h1>Поки що елементів не додано</h1>
            </OpacityDiv>
         )

         if (loading) return (
            <OpacityDiv className={classes.loader_container}>
               <Loader/>
            </OpacityDiv>
         )

         return (
            <OpacityDiv className={classes.list}>
               { elements.map((el, i) => renderCard(el, i)) }
            </OpacityDiv>
         )
      }

      return (
         <div className={cls.join(' ')}>
            <OpacityDiv
               className={classes.title}
               whileInViewport
            >
               <h3>{title}</h3>
            </OpacityDiv>

            <AnimatePresence mode='wait' exitBeforeEnter>
               {renderList()}
            </AnimatePresence>

            { (pageNav && pagesCount > 1 && !loading) &&
               <PageNavigation
                  nextPageClick={nextPageHandler}
                  prevPageClick={prevPageHandler}
                  page={page}
                  pagesCount={pagesCount}
               />
            }
         </div>
      )
   }

export default List