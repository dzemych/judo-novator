import React, {FC, JSXElementConstructor, ReactElement, useEffect, useState} from "react"
import {CollectionType} from "../../types/collection"
import {Typography} from "@mui/material"
import PopUpLoading from "../PopUp/PopUpLoading"
import PopUpError from "../PopUp/PopUpError"
import useItemApi from "../../hooks/useItemApi"
import SuccessArticleForm from "./ArticleForms/SuccessArticleForm"
import {useNavigate, useParams} from "react-router-dom"
import Loader from "../UI/Loader"
import useUid from "../../hooks/useUid";
import TempImgContext from "../context/tempImgContext"
import useTempImg from "../../hooks/useTempImg";


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
      loading: itemLoading
   } = useItemApi(collectionType)

   const {
      uploadTempImg,
      deleteTempImg,
      uploadUrl,
      deleteTempFolder,
      loading: tempImgLoading
   } = useTempImg(collectionType)

   const navigate = useNavigate()
   const { getV1 } = useUid()
   const [status, setStatus] = useState<'init' | 'loaded' |'created' | 'updated' | 'deleted'>('init')
   const [itemLink, setItemLink] = useState('')
   const [item, setItem] = useState<any>(null)
   const [editorKey, setEditorKey] = useState(getV1())

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
      setEditorKey(getV1())
      navigate(`/${collectionType}/new`)
   }

   const fetchItem = async () => {
      const res = await getOneItem(params.slug)

      setItem(res)
      setStatus('loaded')
   }

   useEffect(() => {
      if (type === 'update')
         fetchItem()

      setEditorKey(getV1())
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

   return <div>
      <TempImgContext.Provider value={{
         uploadUrl, uploadTempImg, deleteTempImg, deleteTempFolder, loading: tempImgLoading
      }}>
         <Typography
            variant='h4'
            textAlign='center'
            sx={{ mb: 3, mt: 2 }}
         >
            { title }
         </Typography>

         {childrenWithProps}

         <PopUpLoading isOpen={itemLoading}/>
         <PopUpError isOpen={error} onClose={clearError}/>
      </TempImgContext.Provider>
   </div>
}

export default FormsBase