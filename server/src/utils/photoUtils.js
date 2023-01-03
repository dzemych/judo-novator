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
   let dir = path.resolve(dirPath)

   if (/^(http|https)/.test(dirPath))
      dir = path.resolve(`public/${dirPath.split('/').slice(-3).join('/')}`)

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

const renamePhotoAndGetPath = (modelName, id, name, oldRelPath) => {
   const newRelPath = getPhotoPath(modelName, id, name)
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
   const tempFiles = fs.readdirSync(`public/img/temp/${relativePaths[0][2]}`)
   if (tempFiles.length < 1)
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

exports.updateMainPhotoAndBack = async (photo, modelName, item, next) => {
   const id = item._id

   // 2) Create dir for main and back imgs
   const dirPath = `public/img/${modelName}/${id}`
   const tempDir = `public/${photo.split('/').slice(3, -1).join('/')}`
   try {
      await checkAndCreateDir(dirPath)
   } catch (e) {
      await item.remove()
      throw next(new AppError(`Error during dir check: ${e.message}`, 500))
   }

   // 3) Write main photo(450px width) and back photo (full width)
   const backPhotoName = `back-${modelName}-${id}.jpg`
   const mainPhotoName = `main-${modelName}-${id}.jpg`

   // Process photo if it is provided as File
   if (Buffer.isBuffer(photo)) {
      try {
         await resizeAndWritePhoto(photo, path.join(dirPath, backPhotoName))
         await resizeAndWritePhoto(photo, path.join(dirPath, mainPhotoName), 300)
      } catch(e) {
         deleteDir(`public/img/${modelName}/${id}`)
         await item.remove()

         throw next(new AppError(`Error during main photo writing: ${e.message}`, 500))
      }
   }

   // Process photo if it is provided as temp photo dir
   if (typeof photo === 'string') {
      const relPhotoPath = `public/${photo.split('/').slice(-4).join('/')}`
      const newBackPath = path.resolve(dirPath, backPhotoName)

      if (item.mainPhoto === relPhotoPath)
         return

      try {
         // Move back photo to proper dir
         fs.renameSync(path.resolve(relPhotoPath), newBackPath)
         // Resize and write to proper dir main photo
         await resizeAndWritePhoto(newBackPath, path.join(dirPath, mainPhotoName), 300)
      } catch(e) {
         throw next(new AppError(`Error during processing photo as url to temp file: ${e.message}`, 500))
      }
   } else {
      throw next(new AppError('Unknown photo format', 406))
   }

   const tempFiles = fs.readdirSync(tempDir)
   if (tempFiles.length < 1)
      deleteDir(tempDir)

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

exports.getTempPhotoAndChangeContent = function (content, srcArr, modelName) {
   if (srcArr.length < 1) {
      return content
   } else {
      let newValue = content

      // 1) Get relative paths and photo names
      const relativePaths = srcArr.map(el => el.split('/').slice(-4))

      // 2) Write photos to proper dirs
      checkAndCreateDir(`public/img/${modelName}/${this._id}`)

      const photos = writeAndGetNewPhotos(relativePaths, this._id.toString(), modelName)

      // 3) Change content srcs with relative paths
      srcArr.forEach((el, i) => {
         newValue = newValue.replace(el, photos[i])
      })

      return { newPhotos: photos, newValue }
   }
}