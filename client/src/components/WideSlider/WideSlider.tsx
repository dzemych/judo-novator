import {FC, useEffect, useRef, useState} from "react"
import classes from './WideSlider.module.sass'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {AnimatePresence, motion} from 'framer-motion'
import OpacityDiv from "@components/Animations/OpacityDiv";



interface IProps {
   elements: ISliderElement[]
}

const WideSlider: FC<IProps> = ({ elements }) => {
   const btnVariants = {
      pulse: {
         scale: 1.1,
         transition: {
            delay: 1,
            duration: .6,
            yoyo: Infinity,
            ease: 'easeIn'
         }
      }
   }

   const sliderVariants = {
      initial: {
         height: 0
      },
      active: {
         height: '100%',
         duration: .5,
         delay: .18
      }
   }

   let itemWidth = 0

   if (typeof window !== "undefined") {
      itemWidth = window.outerWidth
   }

   const [page, setPage] = useState(1)
   const [pages, setPages] = useState(elements)
   const [offset, setOffset] = useState(itemWidth)
   const [duration, setDuration] = useState(400)
   const [pageAnimation, setPageAnimation] = useState(false)

   const changePage = (type: 'next' | 'prev') => {
      setPage(prev => {
         if (type === 'next')
            return prev + 1

         if (type === 'prev')
            return prev - 1

         return prev
      })
   }

   const renderSliderItem = (item: ISliderElement, idx: number) => {
      if (idx === 1) return (
         <div key={item.title + idx} className={classes.slider_item}>
            <motion.div
               className={classes.img_container}
               variants={sliderVariants}
               initial='initial'
               // animate='active'
               whileInView='active'
               viewport={{ once: true }}
            >
               <div className={classes.backdrop}/>

               <motion.img
                  src={item.photoSrc}
                  alt=""
                  variants={sliderVariants}
                  initial='initial'
                  whileInView='active'
                  viewport={{ once: true }}
               />
            </motion.div>
         </div>
      )

      return (
         <div key={item.title + idx} className={classes.slider_item}>
            <div className={classes.img_container}>
               <div className={classes.backdrop}/>

               <img src={item.photoSrc} alt=""/>
            </div>
         </div>
      )
   }

   const getPageNumber = () => {
      if (page > elements.length)
         return 1

      if (page === 0)
         return elements.length

      return page
   }

   // 1) Adds tail and start elements
   useEffect(() => {
      setPages([
         elements[elements.length - 1],
         ...elements,
         elements[0]
      ])
   }, [])

   // 2) Replace elements to have infinite scroll
   useEffect(() => {
      if (page === 0)
         setTimeout(async () => {
            await setDuration(0)
            setPage(pages.length - 2)
         }, 400)

      if (page === pages.length - 1)
         setTimeout(async () => {
            await setDuration(0)
            setPage(1)
         }, 400)
   }, [page])

   // 3) Change transition duration to normal
   useEffect(() => {
      if (duration === 0)
         setTimeout(() => {
            setDuration(400)
         }, 400)
   }, [duration])

   // 4) Change offset when page changes and loading
   useEffect(() => {
      setPageAnimation(true)
      setTimeout(() => {
         setPageAnimation(false)
      }, 400)

      setOffset(-(itemWidth * page))
   }, [page])

   return (
      <div className={classes.container}>
         <OpacityDiv whileInViewport className={classes.title} delay={.5}>
            Halls
         </OpacityDiv>

         <OpacityDiv whileInViewport className={classes.pages} delay={.5}>
            {getPageNumber()}/{pages.length - 2}
         </OpacityDiv>

         <OpacityDiv whileInViewport className={classes.subTitle} delay={.5}>
            {pages[page].title}
         </OpacityDiv>

         <div className={classes.window}>
            <motion.div
               className={classes.slider_container}
               style={{
                  transform: `translateX(${offset}px)`,
                  transition: `${duration}ms ease-out`
               }}
            >
               {pages.map((el, i) => renderSliderItem(el, i))}
            </motion.div>

            <OpacityDiv whileInViewport className={classes.slider_btns} delay={.5}>
               <motion.div
                  className={classes.btn_container}
                  onClick={() => !pageAnimation && changePage('prev')}
                  variants={btnVariants}
                  animate='pulse'
               >
                  <FontAwesomeIcon icon={faArrowLeft}/>
               </motion.div>

               <motion.div
                  className={classes.btn_container}
                  onClick={() => !pageAnimation && changePage('next')}
                  variants={btnVariants}
                  animate='pulse'
               >
                  <FontAwesomeIcon icon={faArrowRight}/>
               </motion.div>
            </OpacityDiv>
         </div>
      </div>
   )
}

export default WideSlider