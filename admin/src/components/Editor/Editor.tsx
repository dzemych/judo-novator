import React, { useMemo } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import CustomEditor from './editorConfig'


interface IProps {
   collectionName: string
}

const Editor = React.forwardRef((props: IProps, ref ) => {

   const uid = useMemo(() => {
      return Date.now()
   }, [])

   return <CKEditor
      editor={ CustomEditor }
      // data="<p>Hello from CKEditor 5!</p>"
      config={{
         simpleUpload: {
            // The URL that the images are uploaded to.
            uploadUrl: `http://localhost:5000/api/img/temp/${props.collectionName}/${uid}`,
            // Enable the XMLHttpRequest.withCredentials property.
            withCredentials: false,
         }}
      }
      onReady={ editor => {
         // @ts-ignore
         ref.current = editor
      }}
   />
})

export default Editor