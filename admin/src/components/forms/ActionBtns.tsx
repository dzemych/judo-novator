import React, {FC, useContext, useState} from "react"
import {Grid} from "@mui/material"
import BigButton from "../UI/BigBtn"
import Button from "@mui/material/Button"
import {useNavigate} from "react-router-dom"
import PopUpConfirm from "../PopUp/PopUpConfirm"
import TempImgContext from "../context/tempImgContext";
import RecordContext from "../context/recordContext";
import {CollectionType} from "../../types/collection";


interface IProps {
   onSubmit: (e: React.SyntheticEvent) => void
   deleteHandler: () => void
   disabled: boolean
}

const ActionBtns: FC<IProps> = ({ deleteHandler, onSubmit, disabled }) => {
   const { collectionType, recordType } = useContext(RecordContext)

   const navigate = useNavigate()
   const [showDelete, setShowDelete] = useState(false)
   const { deleteTempFolder } = useContext(TempImgContext)

   const onDelete = () => {
      deleteHandler()
   }

   const onCancel = () => {
      navigate(-1)
      window.localStorage.removeItem(collectionType)
      deleteTempFolder()
      if (collectionType === CollectionType.ALBUM)
         window.localStorage.removeItem(collectionType + '_photos')
   }

   return <>
      <PopUpConfirm
         text={"Запис буде видалено назавжди"}
         isOpen={showDelete}
         onConfirm={onDelete}
         onClose={() => {setShowDelete(false)}}
      />

      <Grid
         container
         justifyContent='center'
         alignItems='center'
         spacing={4}
         mt={2.5}
      >
         <Grid item textAlign='center' xs={12} md={5}>
            <BigButton
               btntype='confirm'
               variant='contained'
               onClick={onSubmit}
               disabled={disabled}
            >
               { recordType === 'create' ? 'Додати' : 'Оновити'}
            </BigButton>
         </Grid>

         <Grid item textAlign='center' xs={12} md={5}>
            <BigButton
               btntype='cancel'
               variant='outlined'
               onClick={onCancel}
               disabled={disabled}
            >
               Скасувати
            </BigButton>
         </Grid>

         {recordType === 'update' &&
            <Grid item textAlign='center' xs={12} md={5}>
               <Button
                  variant='contained'
                  color='error'
                  onClick={() => setShowDelete(true)}
                  disabled={disabled}
               >
                  Видалити запис
               </Button>
            </Grid>
         }
      </Grid>
   </>
}

export default ActionBtns