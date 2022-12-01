const {checkAndCreateDir, writeAndGetPhotos, deleteDir} = require("./photoUtils");


const getAbsPath = (curHost, dir) => {
   const relDir = dir.split('/').slice(1).join('/')
   return `http://${curHost}/${relDir}`
}

exports.getAbsPhotoPaths = function(curHost) {
   let content

   this.photos.forEach(el => {
      content = this.content.replace(el, getAbsPath(curHost, el))
   })

   const mainPhoto = this.mainPhoto.replace(this.mainPhoto, getAbsPath(curHost, this.mainPhoto))
   const backPhoto = this.backPhoto.replace(this.backPhoto, getAbsPath(curHost, this.backPhoto))

   return {content, mainPhoto, backPhoto }
}

const processNewPhotos = async function(next, srcArr, modelName) {
   if (srcArr.length < 1) {
      next()
   } else {
      // 1) Get relative paths and photo names
      const relativePaths = srcArr.map(el => el.split('/').slice(-2))

      // 2) Write photos to proper dirs
      await checkAndCreateDir(`public/img/${modelName}/${this._id}`)
      const photos = await writeAndGetPhotos(relativePaths, this._id, modelName)

      // 3) Change content srcs with relative paths
      srcArr.forEach((el, i) => {
         this.content = this.content.replace(el, photos[i])
      })

      this.photos = photos
   }
}

exports.formatImgSrcToRelative = async function(next) {
   const modelName = this.constructor.modelName.toLowerCase()

   // * Regex for img src
   const srcRegex = /(http|https):\/\/.{3,30}\/img\/temp.*\.(jpg|jpeg|png|gif)/gi

   // 1) Get array of img srcs
   const elArr = this.content.replace(/([<>])/g, "|").split("|")
   const srcArr = elArr.reduce((acc, el) => {
      const str = el.match(srcRegex)

      if (str)
         acc.push(str[0])

      return acc
   }, [])

   // If saving fresh document
   if (this.isNew) {
      await processNewPhotos(srcArr, srcArr, modelName)

   // If changing old content
   } else {
      if (srcArr.length < 1 && this.photos.length > 0) {
         this.photos.forEach(el => deleteDir(el))
         this.photos = []
      } else {
         // 2) Replace all already existing photo srcs with relative paths
         const newPhotos = this.photos.reduce((acc, el) => {
            const idx = srcArr.findIndex(src => src.includes(el))

            if (idx) {
               // Replace abs path in content with relative
               this.content.replace(this.photos[idx], el)
               acc.splice(idx, 1)
            }

            return acc
         }, srcArr)

         await processNewPhotos(next, newPhotos, modelName)
      }
   }

   next()
}