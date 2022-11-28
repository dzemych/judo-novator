import React, {FC, useMemo} from "react"
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import SimpleUploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter';


const Editor: FC = () => {

   const imgFolderId = useMemo(() => {
      return Date.now()
   }, [])

   return (
      <CKEditor
         editor={ ClassicEditor }
         data="<p>Hello from CKEditor 5!</p>"
         config={{
            plugins: [ SimpleUploadAdapter],
            simpleUpload: {
               uploadUrl: 'http://localhost:5000/img/temp/' + imgFolderId,
               withCredentials: true,
            }
         }}
         onReady={ editor => {
            // You can store the "editor" and use when it is needed.
            console.log( 'Editor is ready to use!', editor )
         } }
         onChange={ ( event, editor ) => {
            const data = editor.getData()
            console.log( { event, editor, data } )
         } }
         onBlur={ ( event, editor ) => {
            console.log( 'Blur.', editor )
         } }
         onFocus={ ( event, editor ) => {
            console.log( 'Focus.', editor )
         } }
      />
   )
}

export default Editor