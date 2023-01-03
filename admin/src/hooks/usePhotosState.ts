import {useContext, useMemo, useState} from "react";
import useHttp, {METHOD} from "./useHttp";
import TempImgContext from "../components/context/tempImgContext";


type IProps = (initialState?: Array<string>, initialMainPhotoState?: string) => {
   photos: Array<string>
   changePhotosHandler: (files: FileList) => void
   deletePhotosHandler: (idx: number) => void
   nextPhotoHandler: (idx: number) => void
   prevPhotoHandler: (idx: number) => void
   firstPhotoHandler: (idx: number) => void
   isValidPhotos: () => boolean
   photosError: boolean
   photosLoading: boolean
}

const usePhotosState: IProps = (initialPhotosState = []) => {

   // const { requestJson, loading } = useHttp()
   const { uploadTempImg, loading } = useContext(TempImgContext)

   const [photos, setPhotos] = useState(initialPhotosState)
   const [photosError, setPhotosError] = useState(false)

   // const uid = useMemo(() => `${Date.now()}-${Math.random() * 10000}`, [])

   const getPhotoPromises = (files: File[]) => {
      return files.map(el => {
         // const formData = new FormData()
         // formData.append('upload', el)

         return uploadTempImg(el)
      })
   }

   const uploadPhotos = async (files: File[]) => {
      const photoPromises = getPhotoPromises(files)
      const loadingArr = files.map(() => 'loading')
      const initLength = photos.length

      await setPhotos(prev => [...prev, ...loadingArr])

      for (const i in photoPromises) {
         const url = await photoPromises[i]
         const idx = parseInt(i) + initLength

         // @ts-ignore
         await setPhotos(prev => prev.map((el, index) => {
            if (index === idx) return url

            return el
         }))
      }
   }

   const changePhotosHandler = (files: FileList) => {
      if (files instanceof FileList) {
         const filesArr = Array.from(files)

         uploadPhotos(filesArr)
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
      photosLoading: loading,
   }
}

export default usePhotosState