const fs = require('fs')
const path = require('path')
const fsPromise = require('fs/promises')
const sharp = require('sharp')


const resizePhoto = async (photo, path, width) => {
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

exports.checkPhotoDirExist = async (collection, id) => {
   if (!fs.existsSync(path.resolve('public')))
      await fsPromise.mkdir(path.resolve('public'))

   if (!fs.existsSync(path.resolve('public/img')))
      await fsPromise.mkdir(path.resolve('public/img'))

   if (!fs.existsSync(path.resolve(`public/img/${collection}`)))
      await fsPromise.mkdir(path.resolve(`public/img/${collection}`))

   if (!fs.existsSync(path.resolve(`public/img/${collection}/${id}`)))
      await fsPromise.mkdir(path.resolve(`public/img/${collection}/${id}`))
}

exports.writeAndGetPhotos = async (files, id, collection) => {
   const photos = []

   // 1) Write and resize all photos to db
   for (i in files) {
      const photoPath = getPhotoPath(collection, id, i)

      await resizePhoto(files[i].buffer, photoPath, 2000)

      photos.push(photoPath)
   }

   // 2) Write and resize main photo, make it small for fast download
   const mainPhoto = getPhotoPath(collection, id, 'main')
   await resizePhoto(files[0].buffer, mainPhoto, 500)

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