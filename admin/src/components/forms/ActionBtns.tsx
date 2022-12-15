import React, {FC} from "react";
import {Grid} from "@mui/material";
import BigButton from "../UI/BigBtn";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";


interface IProps {
   type: 'create' | 'update'
   onSubmit: (e: React.SyntheticEvent) => void
   onDelete: () => void
}

const ActionBtns: FC<IProps> = ({ type, onDelete, onSubmit }) => {
   const navigate = useNavigate()

   return (
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
                  onClick={onDelete}
               >
                  Видалити запис
               </Button>
            </Grid>
         }
      </Grid>
   )
}

export default ActionBtns