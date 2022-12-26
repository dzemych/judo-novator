import React, {FC, useState} from "react";
import {Grid} from "@mui/material";
import BigButton from "../UI/BigBtn";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import PopUpConfirm from "../PopUp/PopUpConfirm";


interface IProps {
   type: 'create' | 'update'
   onSubmit: (e: React.SyntheticEvent) => void
   deleteHandler: () => void
}

const ActionBtns: FC<IProps> = ({ type, deleteHandler, onSubmit }) => {
   const navigate = useNavigate()
   const [showDelete, setShowDelete] = useState(false)

   return <>
      <PopUpConfirm
         text={"Запис буде видалено назавжди"}
         isOpen={showDelete}
         onConfirm={deleteHandler}
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
            <BigButton btntype='confirm' variant='contained' onClick={onSubmit}>
               { type === 'create' ? 'Додати' : 'Оновити'}
            </BigButton>
         </Grid>

         <Grid item textAlign='center' xs={12} md={5}>
            <BigButton btntype='cancel' variant='outlined' onClick={() => navigate(-1)}>
               Скасувати
            </BigButton>
         </Grid>

         {type === 'update' &&
            <Grid item textAlign='center' xs={12} md={5}>
               <Button
                  variant='contained'
                  color='error'
                  onClick={() => setShowDelete(true)}
               >
                  Видалити запис
               </Button>
            </Grid>
         }
      </Grid>
   </>
}

export default ActionBtns