import {useMemo, useState} from "react";
import useHttp, {METHOD} from "./useHttp";


type IProps = (initialState?: Array<File>) => {
   photos: Array<File | string>
   changePhotosHandler: (files: FileList | File) => void
   deletePhotosHandler: (idx: number) => void
   nextPhotoHandler: (idx: number) => void
   prevPhotoHandler: (idx: number) => void
   firstPhotoHandler: (idx: number) => void
   isValidPhotos: () => boolean
   photosError: boolean
}

const usePhotosState: IProps = (initialState = []) => {

   const { requestJson } = useHttp()

   const [photos, setPhotos] = useState<Array<File | string>>(initialState)
   const [photosError, setPhotosError] = useState(false)

   const uid = useMemo(() => Date.now(), [])

   const getPhotoPromises = (files: File[]) => {
      return files.map(el => {
         const formData = new FormData()
         formData.append('upload', el)

         return requestJson(
            `/api/img/temp/album/${uid}`,
            METHOD.post,
            formData
         )
      })
   }

   const uploadPhotos = async (files: File[]) => {
      const photoPromises = getPhotoPromises(files)
      const loadingArr = files.map(() => 'loading')
      const initLength = photos.length

      await setPhotos(prev => [...prev, ...loadingArr])

      for (const i in photoPromises) {
         const res = await photoPromises[i]
         const idx = parseInt(i) + initLength

         // @ts-ignore
         await setPhotos(prev => prev.map((el, index) => {
            if (index === idx) return res.url

            return el
         }))
      }
   }

   const changePhotosHandler = async (files: FileList | File) => {
      if (files instanceof FileList) {
         const filesArr = Array.from(files)

         await uploadPhotos(filesArr)
      }
   }

   const deletePhotosHandler = (idx: number) => {
      setPhotos(prev => prev.filter((el, i) => i !== idx))
   }

   const nextPhotoHandler = (idx: number) => {
      if (idx < photos.length - 1)
         setPhotos(prev => prev.map((el, i) => {
            if (i === idx)
               return prev[idx + 1]

            if (i === idx + 1)
               return prev[idx]

            return el
         }))
   }

   const prevPhotoHandler = (idx: number) => {
      if (idx >= 1)
         setPhotos(prev => prev.map((el, i) => {
         if (idx < 1)
            return el

         if (i === idx)
            return prev[idx - 1]

         if (i === idx - 1)
            return prev[idx]

         return el
      }))
   }

   const firstPhotoHandler = (idx: number) => {
      if (idx !== 0)
         setPhotos(prev => [...prev.splice(idx, 1), ...prev])
   }

   const isValidPhotos = () => {
      if (photos.length < 2) {
         setPhotosError(true)
         return false
      } else {
         setPhotosError(false)
         return true
      }
   }

   return {
      photos,
      changePhotosHandler,
      deletePhotosHandler,
      nextPhotoHandler,
      prevPhotoHandler,
      firstPhotoHandler,
      isValidPhotos,
      photosError,
   }
}

export default usePhotosState