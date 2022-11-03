import { Html, Head, Main, NextScript } from 'next/document'
import path from 'path'
import fs from 'fs'


export default function Document() {
   // const mediaPath = path.join(__dirname, '..', '..', 'static/media')
   // const allFiles = fs.readdirSync(mediaPath)

   // const fontFiles = allFiles.filter(filePath => {
   //    const type = filePath.split('.').pop()
   //
   //    if (!type)
   //       return false
   //
   //    return /(woff2|ttf|otf)/i.test(type)
   // })

   return (
      <Html>
         <Head>
            {/*{fontFiles.map((fontPath) => (*/}
            {/*   <link*/}
            {/*      key={fontPath}*/}
            {/*      rel="preload"*/}
            {/*      href={`_next/static/media/${fontPath}`}*/}
            {/*      as="font"*/}
            {/*      type="font/woff2"*/}
            {/*   />*/}
            {/*))}*/}
         </Head>

         <body>
            <Main />
            <NextScript />
         </body>
      </Html>
   )
}