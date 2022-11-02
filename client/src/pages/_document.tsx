import { Html, Head, Main, NextScript } from 'next/document'


export default function Document() {
   return (
      <Html>
         <Head>
            <link
               rel="preload"
               href="/client/src/public/fonts/BigNoodle.woff2"
               as="font"
               type="font/woff2"
            />
         </Head>

         <body>
            <Main />
            <NextScript />
         </body>
      </Html>
   )
}