import {CollectionType} from "../types/collection";
import useHttp, {METHOD} from "./useHttp";
import {useCallback} from "react";


type IUpdateRequest = (id: string | undefined, formData: FormData) => any
type ICreateRequest = (formData: FormData) => any
type IGetOneRequest = (id: string | undefined) => any
type IDeleteRequest = (id: string) => Promise<boolean>

type IFunction = (collectionType: CollectionType) => {
   updateItem: IUpdateRequest,
   createItem: ICreateRequest,
   getOneItem: IGetOneRequest,
   deleteItem: IDeleteRequest,
   clearError: () => void,
   error: string | null,
   loading: boolean
}

const useItemApi: IFunction = (collectionType) => {
   const { loading, requestJson, error, clearError } = useHttp()

   const updateItem: IUpdateRequest = useCallback(async (id, formData) => {
      const res = await requestJson(
         `/api/${collectionType}/${id}`,
         METHOD.patch,
         formData
      )

      if (!res) return null

      return res.item.slug
   }, [collectionType, requestJson])

   const createItem: ICreateRequest = useCallback(async (formData) => {
      const res = await requestJson(
         `/api/${collectionType}`,
         METHOD.post,
         formData
      )

      if (!res) return null

      return res.item.slug
   }, [requestJson, collectionType])

   const getOneItem: IGetOneRequest = useCallback(async (id) => {
      const res = await requestJson(`/api/${collectionType}/${id}`, METHOD.get)

      if (!res) return null

      return res.item
   }, [requestJson, collectionType])

   const deleteItem: IDeleteRequest = useCallback(async (id) => {
      const res = await requestJson(`/api/${collectionType}/${id}`, METHOD.delete)

      return !res
   }, [requestJson, collectionType])

   return { updateItem, createItem, getOneItem, deleteItem, clearError, error, loading }
}

export default useItemApi