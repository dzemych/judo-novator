import { Html, Head, Main, NextScript } from 'next/document'
import Script from "next/script";


export default function Document() {
   return (
      <Html>
         <Head>
         </Head>
         <body>
         <Main />

         <Script
            id={'preloader-script'}
            strategy={'beforeInteractive'}
            onLoad={() => {
               console.log('In preloader')
            }}
         >
            {` setTimeout(() => {
   console.log('loaded')
   console.log(document)

   const body = document.querySelector('body')

   console.log(body)

   const el = \`
   <div id="preloader-el" style="width: 100vw; height: 100vh; background: black">
   
   </div>
\`

   const htmlObject = document.createElement('div')
   htmlObject.innerHTML = el

   body.appendChild(htmlObject)

   console.log('appended')
}, 20)`}
         </Script>

         <NextScript />
         </body>
      </Html>
   )
}