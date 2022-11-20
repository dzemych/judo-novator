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

      const { isSmallLaptop, isNormalLaptop, isBigLaptop } = useMedia()

      const cls = [classes.container]

      if (colorSchema === 'black')
         cls.push(classes.black)

      if (colorSchema === 'white')
         cls.push(classes.white)

      if (cardType === 'small')
         cls.push(classes.small)

      if (
         cardType === 'big' &&
         (isNormalLaptop || isBigLaptop) &&
         (!firstBig || (firstBig && page !== 1) || (firstBig && elements.length <= 2))
      )
         cls.push(classes.big)

      if (
         cardType === 'big' &&
         (isNormalLaptop || isBigLaptop) &&
         firstBig &&
         page === 1 &&
         elements.length > 2
      )
         cls.push(classes.firstExt)

      const renderCard = (el: ICard, idx: number) => {
         let newCardType = cardType

         if (
            (isSmallLaptop || isNormalLaptop || isBigLaptop) &&
            ( idx === 0 ) &&
            firstBig &&
            ( elements.length > 2 ) &&
            page === 1
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

         // For some reason don't want work properly on phones (in f12 mode everything works fine)
         if (loading && window.innerWidth > 950) return (
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

            <AnimatePresence mode='wait'>
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