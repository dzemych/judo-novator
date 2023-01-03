import {CollectionType} from "../types/collection";
import useUid from "./useUid";
import {useMemo} from "react";
import useHttp, {METHOD} from "./useHttp";
import {IDeleteTempFolder, IDeleteTempImg, ITempImgContextState, IUploadTempImg} from "../types/ITempImgContext";


type IHook = (collectionType: CollectionType) => ITempImgContextState

const useTempImg: IHook = ( collectionType ) => {
   const { v2 } = useUid()
   const { requestJson, loading } = useHttp()

   const uploadUrl = useMemo(() =>
      `/api/img/temp/${collectionType}/${v2}`
      , [collectionType, v2])

   const uploadTempImg: IUploadTempImg = async (file) => {
      const formData = new FormData()
      formData.append('upload', file)

      const res = await requestJson(uploadUrl, METHOD.post, formData)
      console.log(res)

      return res === null ? res : res.url
   }

   const deleteTempImg: IDeleteTempImg = async (url) => {
      const res = await requestJson(url, METHOD.delete)

      return res === null ? res : res.data
   }

   const deleteTempFolder: IDeleteTempFolder = async () => {
      const res = await requestJson(uploadUrl, METHOD.delete)

      return res === null ? res : res.data
   }

   return { uploadUrl, uploadTempImg, deleteTempImg, deleteTempFolder, loading }
}

export default useTempImg