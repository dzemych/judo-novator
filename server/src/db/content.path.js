const {
         getAbsPath,
         getTempPhotoAndChangeContent,
         deleteDir
} = require("../utils/photoUtils")
const fs = require("fs")
const path = require("path")
const AppError = require("../utils/AppError")


const contentPath = (required = true) => {
   return {
      content    : {
         type    : String,
         default: undefined,
         required,
         // For some reason cannot take out set to separate function,
         // probably because set cannot work with callbacks
         set: function (val) {
            let newVal = val

            const modelName = this.collection.collectionName
               .split('').slice(0, -1).join('')

            // * Regex for img src
            const srcRegex = /(http|https):\/\/.{3,30}\/img\/.*\.(jpg|jpeg|png|gif)/gi

            // 1) Get array of img srcs
            const elArr = val.replace(/([<>])/g, "|").split("|")
            const srcArr = elArr.reduce((acc, el) => {
               const str = el.match(srcRegex)

               if (str)
                  acc.push(str[0])

               return acc
            }, [])

            if (!srcArr.length) return val

            // If saving new document
            if (this.isNew) {
               const { newPhotos, newValue } = getTempPhotoAndChangeContent.apply(this, [newVal, srcArr, modelName])
               this.photos = newPhotos
               newVal = newValue
               // If changing old content
            } else {
               let newPhotosArr = []

               // Get new temp photos and change old abs paths to rel
               const newSrcs = srcArr.reduce((acc, absElPath) => {
                  const relElPath = `public/${absElPath.split('/').slice(-4).join('/')}`

                  if (this.photos.includes(relElPath)) {
                     newVal = newVal.replace(absElPath, relElPath)
                     newPhotosArr.push(relElPath)
                  }
                  else
                     acc.push(absElPath)

                  return acc
               }, [])

               if (newSrcs.length) {
                  const { newPhotos, newValue } = getTempPhotoAndChangeContent.apply(this, [newVal, newSrcs, modelName])

                  this.photos = [...newPhotosArr, ...newPhotos]
                  newVal = newValue
               } else
                  this.photos = newPhotosArr

               // Delete old photos
               try {
                  const relDirPath = `public/img/${modelName}/${this._id}`
                  const files = fs.readdirSync(path.resolve(relDirPath))

                  files.forEach(el => {
                     const photoPath = `${relDirPath}/${el}`

                     if (
                        !(newVal.includes(photoPath)) &&
                        el.split('-')[0] !== 'back' &&
                        el.split('-')[0] !== 'main'
                     )
                        deleteDir(photoPath)
                  })
               }
               catch (e) {
                  throw new AppError(`Error during deleting old photos: ${e.message}`, 500)
               }
            }

            return newVal
         },
         get: function (val) {
            let newContent = val

            if (val)
               this.photos.forEach(el => {
                  newContent = newContent.replace(el, getAbsPath(el))
               })

            return newContent
         }
      },
      photos     : {
         type: [String],
         required,
         default: undefined
      },
   }
}

module.exports = contentPath