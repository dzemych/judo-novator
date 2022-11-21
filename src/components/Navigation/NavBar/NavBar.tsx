import React, {FC} from "react"
import classes from './NavBar.module.sass'
import Link from "next/link";
import OpacityDiv from "@components/Animations/OpacityDiv";


interface ILink {
   to: string,
   text: string
}

const NavBar: FC = () => {
   const links: ILink[] = [
      { to: '/', text: 'Головна' },
      { to: '/blog', text: 'Блог' },
      { to: '/team', text: 'Команда' },
      { to: '/album', text: 'Галерея' },
      { to: '/events', text: 'Календар' },
      { to: '/about', text: 'Про нас' },
      { to: '/contacts', text: 'Контакти' },
   ]

   const renderLink = (el: ILink, idx: number) => (
      <Link href={el.to} key={el.to + idx}>
         {el.text}
      </Link>
   )

   return (
      <OpacityDiv className={classes.container}>
         <div className={classes.wrapper}/>

         <nav className={classes.wrapper}>
            { links.map((el, i) => renderLink(el, i)) }
         </nav>
      </OpacityDiv>
   )
}

export default NavBar