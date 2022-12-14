const fs = require('fs')
const path = require('path')
const sharp = require('sharp')
const AppError = require("./AppError");


const resizeAndWritePhoto = async (photo, path, width) => {
   await sharp(photo)
      .resize({ width })
      .withMetadata()
      .flatten({
         background: {r: 255, g: 255, b: 255, alpha: 1}
      })
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(path)
}

const getPhotoPath = (modelName, id, name) => {
   return `public/img/${modelName}/${id}/${name}-${modelName}-${id}.jpg`
}

const deleteDir = (dirPath) => {
   const dir = path.resolve(dirPath)

   if (fs.existsSync(dir))
      fs.rmSync(dir, { recursive: true, force: true })
}

exports.deleteDir = deleteDir

exports.resizeAndWritePhoto = resizeAndWritePhoto

exports.multerFilter = (req, file, cb) => {
   const fileExt = file.mimetype.split('/')[0]

   if (fileExt !== 'image')
      return cb(new AppError('Upload only images', 415), false)

   cb(null, true)
}

exports.checkAndCreateDir = (dirPath) => {
   // All directions are inside public folder
   const dirArr = dirPath.split("/")

   dirArr.forEach((el, i) => {
      const checkPath = path.resolve( dirArr.slice(0, i + 1).join('/') )

      if (!fs.existsSync(checkPath))
         fs.mkdirSync(checkPath)
   })
}

exports.writeAndGetPhotos = (relativePaths, id, modelName) => {
   const photos = []

   // 1) Write and resize all photos to proper folder
   for (i in relativePaths) {
      const newRelPath = getPhotoPath(modelName, id, i)
      const oldAbsPath = path.resolve('public', relativePaths[i].join('/'))

      try {
         fs.renameSync(oldAbsPath, path.resolve(newRelPath))
      } catch (e) {
         throw new AppError(`Error during renaming photos: ${e.message}`, 500)
      }

      photos.push(newRelPath)
   }

   // 2) Delete temp folder
   deleteDir(`public/img/temp/${relativePaths[0][2]}`)

   // 3) Return photo paths
   return photos
}

exports.deletePhotoFiles = async (collection, id) => {
   const relativeDir = `public/img/${collection}/${id}`

   const deletePhotosCallback = async (err, files) => {
      if (files) {

         for (const file of files) {
            await fs.unlink(path.join(relativeDir, file), err => {
               if (err) throw err
            })
         }

      }
   }

   fs.readdir(
      path.resolve(relativeDir),
      deletePhotosCallback
   )
}