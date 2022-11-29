const fs = require('fs')
const path = require('path')
const fsPromise = require('fs/promises')
const sharp = require('sharp')
const AppError = require("./AppError");


const resizeAndWritePhoto = async (photo, path, width) => {
   await sharp(photo)
      .resize({ width })
      .withMetadata()
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(path)
}

const getPhotoPath = (collection, id, name) => {
   return `public/img/${collection}/${id}/${name}-${id}.jpg`
}

exports.resizeAndWritePhoto = resizeAndWritePhoto

exports.multerFilter = (req, file, cb) => {
   const fileExt = file.mimetype.split('/')[0]

   if (fileExt !== 'image')
      return cb(new AppError('Upload only images', 415), false)

   cb(null, true)
}

exports.checkAndCreateDir = async (pathArr, returnPath) => {
   // All directions are inside public folder
   const pathPromised = pathArr.map((el, i) => {
      const checkPath = path.resolve('public', pathArr.slice(0, i + 1).join('/'))

      if (!fs.existsSync(checkPath))
         return fsPromise.mkdir(checkPath)
   })

   await Promise.all(pathPromised)

   if (returnPath)
      return path.resolve('public', pathArr.join('/'))
}

exports.writeAndGetPhotos = async (files, id, collection) => {
   const photos = []

   // 1) Write and resize all photos to db
   for (i in files) {
      const photoPath = getPhotoPath(collection, id, i)

      await resizeAndWritePhoto(files[i].buffer, photoPath, 2000)

      photos.push(photoPath)
   }

   // 2) Write and resize main photo, make it small for fast download
   const mainPhoto = getPhotoPath(collection, id, 'main')
   await resizeAndWritePhoto(files[0].buffer, mainPhoto, 500)

   // 3) Return photo paths
   return { photos, mainPhoto, backgroundPhoto: getPhotoPath(collection, id, 0)}
}

exports.deleteDir = (collection, id) => {
   const dir = path.resolve(`public/img/${collection}/${id}`)

   if (fs.existsSync(dir))
      fs.rmSync(dir, { recursive: true, force: true })
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