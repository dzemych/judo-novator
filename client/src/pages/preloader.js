setTimeout(() => {
   console.log('loaded')
   console.log(document)

   document.querySelector('html').style.height = '100vh'

   const body = document.querySelector('body')

   console.log(body)

   const el = `
   <div id="preloader-el" style="width: 100vw; height: 100vh; background: black">
   
   </div>
`

   const htmlObject = document.createElement('div')
   htmlObject.innerHTML = el

   body.appendChild(htmlObject)

   console.log('appended')
}, 20)