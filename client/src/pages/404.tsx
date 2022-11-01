import {FC} from "react";

const NotFound: FC = () => {
   return (
      <div style={{
         fontFamily: 'Roboto Regular',
         width: '100vw',
         height: '100vw',
         display: 'flex',
         flexDirection: 'column',
         justifyContent: 'center',
         alignItems: 'center'
      }}>
         <h1 style={{
            margin: '0 auto',
            color: '#5f6164'
         }}>
            Сторінку не найдено
         </h1>

         <hr style={{
            background: '#c0c2c7',
            height: 1,
            border: 'none',
            padding: 'none',
            width: '90%',
         }}/>

         <h2 style={{
            margin: '0 auto',
            color: '#606164'
         }}>
            404
         </h2>
      </div>
   )
}

export default NotFound