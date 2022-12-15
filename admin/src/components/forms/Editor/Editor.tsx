import React, {useMemo, FC, useEffect} from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import CustomEditor from './editorConfig'
import classes from "./Editor.module.sass";


interface IProps {
   collectionName: string
   error?: boolean
   state: string | undefined
   changeHandler: (e: React.ChangeEvent<HTMLInputElement>, val: any) => void
}

const Editor: FC<IProps> = (props: IProps ) => {

   const uid = useMemo(() => {
      return Date.now()
   }, [])

   return (
      <>
         <div style={{
            border: props.error ? '1px solid #d32f2f' : '1px solid gray',
            borderRadius: '2px'
         }}>
            <CKEditor
               editor={ CustomEditor }
               data={props.state}
               config={{
                  simpleUpload: {
                     // The URL that the images are uploaded to.
                     uploadUrl: `http://localhost:5000/api/img/temp/${props.collectionName}/${uid}`,
                     // Enable the XMLHttpRequest.withCredentials property.
                     withCredentials: false,
                  }}
               }
               onChange={ ( event, editor ) => {
                  props.changeHandler(event, editor.getData())
               } }
            />
         </div>

         { props.error &&
            <p className={classes.editor_error}>Це поле не може бути пустим</p>
         }
      </>
   )
}

export default Editor