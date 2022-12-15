import React, {FC} from "react";
import {Grid} from "@mui/material";
import TextField from "@mui/material/TextField";
import {ITextInput} from "../../types/textInput";


const TextInputs: FC<{ inputs: ITextInput[] }> = ({ inputs }) => {
   return <>
      {inputs.map(el => (
         <Grid key={el.key} item xs={12} sx={{ mb: 1.5 }} >
            <TextField
               label={el.label}
               fullWidth
               variant="filled"
               multiline
               helperText={el.helperText}
               error={el.error}
               value={el.value}
               onChange={ el.changeHandler }
               rows={ el.rows ? el.rows : 1 }
            />
         </Grid>
      ))}
   </>
}

export default TextInputs