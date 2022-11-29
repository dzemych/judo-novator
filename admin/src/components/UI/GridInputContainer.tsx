import { Grid } from '@mui/material'
import { FC, ReactNode } from 'react'


interface IProps {
   // key?: string
   children: ReactNode
}

const GridInputContainer: FC<IProps> = ({ children }) => {
   return (
      <Grid item xs={12} sx={{ mb: 2 }} >
         {children}
      </Grid>
   )
}

export default GridInputContainer