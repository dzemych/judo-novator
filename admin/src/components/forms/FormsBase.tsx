import React, {FC, JSXElementConstructor, ReactElement, useEffect, useState} from "react"
import {CollectionType} from "../../types/collection"
import {Typography} from "@mui/material"
import PopUpLoading from "../PopUp/PopUpLoading"
import PopUpError from "../PopUp/PopUpError"
import useItemApi from "../../hooks/useItemApi"
import SuccessArticleForm from "./ArticleForms/SuccessArticleForm"
import {useParams} from "react-router-dom"
import Loader from "../UI/Loader"


interface IProps {
   collectionType: CollectionType
   title: string
   children: ReactElement<any, string | JSXElementConstructor<any>>
   type: 'create' | 'update'
}

const FormsBase: FC<IProps> = ({ collectionType, title, children, type }) => {

   const params = useParams()

   const {
      createItem,
      updateItem,
      deleteItem,
      getOneItem,
      error,
      clearError,
      loading
   } = useItemApi(collectionType)

   const [status, setStatus] = useState<'init' | 'loaded' |'created' | 'updated' | 'deleted'>('init')
   const [itemLink, setItemLink] = useState('')
   const [editorKey, setEditorKey] = useState(Math.random() * 1000)
   const [item, setItem] = useState<any>(null)

   const createHandler = async (formData: FormData) => {
      const slug = await createItem(formData)

      if (slug) {
         setStatus('created')
         setItemLink(`/${collectionType}/${slug}`)
      }
   }

   const deleteHandler = async () => {
      const isDeleted = await deleteItem(item._id)

      if (isDeleted)
         setStatus('deleted')
   }

   const updateHandler = async (formData: FormData) => {
      const slug = await updateItem(params.slug, formData)

      if (slug) {
         setStatus('updated')
         setItemLink(`/${collectionType}/${slug}`)
      }
   }

   const setToInitial = () => {
      setStatus('init')
      setEditorKey(Math.random() * 10000)
   }

   const fetchItem = async () => {
      const res = await getOneItem(params.slug)

      setItem(res)
      setStatus('loaded')
   }

   useEffect(() => {
      if (type === 'update')
         fetchItem()
   }, [params, type])

   if (type === 'update' && !item && !error)
      return <Loader/>

   if (type === 'update' && error?.match(/no item found/i))
      return <Typography
         variant='h3'
         sx={{
            margin: theme => theme.spacing(3, '0'), textAlign: 'center',
            color: theme => theme.palette.grey['500']
         }}
      >
         Запис не найдено
      </Typography>

   if (status !== 'init' && status !== 'loaded')
      return <SuccessArticleForm
         status={status}
         itemLink={itemLink}
         setAllInitial={setToInitial}
      />

   const childrenWithProps = React.cloneElement(children, {
      collectionType: collectionType,
      type: type,
      key: editorKey,
      submitHandler: type === 'create' ? createHandler : updateHandler,
      deleteHandler: type === 'create' ? undefined : deleteHandler,
      item: type === 'create' ? undefined : item,
   })

   return <>
      <Typography
         variant='h4'
         textAlign='center'
         sx={{ mb: 3, mt: 2 }}
      >
         { title }
      </Typography>

      {childrenWithProps}

      <PopUpLoading isOpen={loading}/>
      <PopUpError isOpen={error} onClose={clearError}/>
   </>
}

export default FormsBase