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
   const uid = `${Math.floor(Math.random() * 10000)}_${Date.now()}`

   return `public/img/${modelName}/${id}/${name}-${modelName}-${uid}.jpg`
}

const deleteDir = (dirPath) => {
   const dir = path.resolve(dirPath)

   if (fs.existsSync(dir))
      fs.rmSync(dir, { recursive: true, force: true })
}

const checkAndCreateDir = (dirPath) => {
   // All directions are inside public folder
   const dirArr = dirPath.split("/")

   dirArr.forEach((el, i) => {
      const checkPath = path.resolve( dirArr.slice(0, i + 1).join('/') )

      if (!fs.existsSync(checkPath))
         fs.mkdirSync(checkPath)
   })
}

const renamePhotoAndGetPath = (modelName, id, idx, oldRelPath) => {
   const newRelPath = getPhotoPath(modelName, id, idx)
   let oldAbsPath = path.resolve('public', oldRelPath)

   if (oldRelPath.split('/')[0] === 'public')
      oldAbsPath = path.resolve(oldRelPath)

   try {
      fs.renameSync(oldAbsPath, path.resolve(newRelPath))
   } catch (e) {
      throw new AppError(`Error during renaming photos: ${e.message}`, 500)
   }

   return newRelPath
}

const writeAndGetNewPhotos = (relativePaths, id, modelName) => {
   const photos = []

   // 1) Write and resize all photos to proper folder
   for (i in relativePaths) {
      const newPath = renamePhotoAndGetPath(modelName, id, i, relativePaths[i].join('/'))

      photos.push(newPath)
   }

   // 2) Delete temp folder
   deleteDir(`public/img/temp/${relativePaths[0][2]}`)

   // 3) Return photo paths
   return photos
}


exports.deleteDir = deleteDir

exports.resizeAndWritePhoto = resizeAndWritePhoto

exports.checkAndCreateDir = checkAndCreateDir

exports.getPhotoPath = getPhotoPath

exports.writeAndGetPhotos = writeAndGetNewPhotos

exports.renamePhotoAndGetPath = renamePhotoAndGetPath

exports.updateMainPhotoAndBack = async (file, modelName, item, next) => {
   const id = item._id

   // 2) Create dir for main img
   const dirPath = `public/img/${modelName}/${id}`
   try {
      await checkAndCreateDir(dirPath)
   } catch (e) {
      await item.remove()
      return next(new AppError(`Error during dir check: ${e.message}`, 500))
   }

   // 3) Write main photo(450px width) and back photo (full width)
   const backPhotoName = `back-${modelName}-${id}.jpg`
   const mainPhotoName = `main-${modelName}-${id}.jpg`

   // * If error during photo write delete db document and dir for photos
   try {
      await resizeAndWritePhoto(file, path.join(dirPath, backPhotoName))
      await resizeAndWritePhoto(file, path.join(dirPath, mainPhotoName), 300)
   } catch(e) {
      deleteDir(`public/img/${modelName}/${id}`)
      await item.remove()

      return next(new AppError(`Error during main photo writing: ${e.message}`, 500))
   }

   item.mainPhoto = `${dirPath}/${mainPhotoName}`
   item.backPhoto = `${dirPath}/${backPhotoName}`

   await item.save({ new: true })
}

exports.getAbsPath = (dir) => {
   const relDir = dir.split('/').slice(1).join('/')
   return `http://${curHost}:5000/${relDir}`
}

exports.multerFilter = (req, file, cb) => {
   const fileExt = file.mimetype.split('/')[0]

   if (fileExt !== 'image')
      return cb(new AppError('Upload only images', 415), false)

   cb(null, true)
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

exports.processNewTempPhotos = function (val, srcArr, modelName) {
   if (srcArr.length < 1) {
      return val
   } else {
      let newVal = val

      // 1) Get relative paths and photo names
      const relativePaths = srcArr.map(el => el.split('/').slice(-4))

      // 2) Write photos to proper dirs
      checkAndCreateDir(`public/img/${modelName}/${this._id}`)

      const photos = writeAndGetNewPhotos(relativePaths, this._id.toString(), modelName)

      // 3) Change content srcs with relative paths
      srcArr.forEach((el, i) => {
         newVal = newVal.replace(el, photos[i])
      })

      this.photos = photos
      return newVal
   }
}