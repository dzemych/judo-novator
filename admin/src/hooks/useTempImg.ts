import {CollectionType} from "../types/collection";
import useUid from "./useUid";
import {useEffect, useMemo} from "react";
import useHttp, {METHOD} from "./useHttp";
import {IDeleteTempFolder, IDeleteTempImg, ITempImgContextState, IUploadTempImg} from "../types/ITempImgContext";


type IHook = (collectionType: CollectionType, type: 'update' | 'create') => ITempImgContextState

const useTempImg: IHook = ( collectionType, type ) => {
   const { v2 } = useUid()
   const { requestJson, loading } = useHttp()

   const folderId = useMemo(() => {
      const savedId = window.localStorage.getItem(`${collectionType}_folderId`)
      let id = v2

      if (type === 'create') {
         if (savedId) id = savedId
         else window.localStorage.setItem(`${collectionType}_folderId`, v2)
      }

      return id
   }, [collectionType, v2])

   const uploadUrl = useMemo(() => `/api/img/temp/${collectionType}/${folderId}`, [folderId, collectionType])

   const uploadTempImg: IUploadTempImg = async (file) => {
      const formData = new FormData()
      formData.append('upload', file)

      const res = await requestJson(uploadUrl, METHOD.post, formData)

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

   useEffect(() => {
      return () => {
         if (type === 'update') deleteTempFolder()
      }
   }, [])

   return { uploadUrl, uploadTempImg, deleteTempImg, deleteTempFolder, loading }
}

export default useTempImg