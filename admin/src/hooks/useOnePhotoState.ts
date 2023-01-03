import {useContext, useState} from "react";
import TempImgContext from "../components/context/tempImgContext";


type IHook = (initialState: string) => {
   mainPhoto: string
   changeMainPhoto: (file: FileList | string) => Promise<void>
   isValidMainPhoto: () => boolean
   mainPhotoError: boolean
   mainPhotoLoading: boolean
}

const useOnePhotoState: IHook = (initialState) => {

   const { uploadTempImg, loading } = useContext(TempImgContext)

   const [mainPhoto, setMainPhoto] = useState(initialState)
   const [mainPhotoError, setMainPhotoError] = useState(false)

   const changeMainPhoto = async (file: FileList | string) => {

   }

   const isValidMainPhoto = () => {
      setMainPhotoError(!mainPhoto)
      return !!mainPhoto
   }

   return { mainPhoto, mainPhotoError, mainPhotoLoading: loading, changeMainPhoto, isValidMainPhoto }
}

export default useOnePhotoState