import {FC, SyntheticEvent} from "react";
import {
   Card,
   CardActionArea,
   CardMedia,
   Container,
   Grid,
   styled,
   Typography,
   TypographyProps
}
   from "@mui/material";
import {CardType, ICardItem} from "../../types/card";
import useFormatDate from "../../hooks/useFormatDate";
import {useNavigate} from "react-router-dom";
import addImg from '../../assets/images/add.png'


interface IProps {
   card: ICardItem
   cardType: CardType
   mock?: number
}

interface ICardTextProps extends TypographyProps {
   mock?: number
}

const CardText = styled(Typography)<ICardTextProps>( ({theme, mock}) => ({
   fontWeight: 600,
   lineHeight: '100%',
   fontSize: '1.1rem',
   marginBottom: theme.spacing(1.5),
   ...(!!mock && {
      color: theme.palette.grey['200'],
      background: theme.palette.grey['200'],
      margin: 14
   })
}) )

const ListItem: FC<IProps> = ({ card, cardType, mock= 0 }) => {

   const formatedDate = useFormatDate(card.date)
   const navigate = useNavigate()

   let photoStyles = {}

   if (mock) {
      photoStyles = {
         objectPosition: 'center',
         objectFit: 'contain',
         padding: 20
      }
   }

   const goTo = (type: string) => {
      navigate(`/${type}/${card.slug}`)
   }

   const onChange = (e: SyntheticEvent) => {
      e.preventDefault()
      e.stopPropagation()

      switch(cardType) {
         case CardType.BLOGS:
            goTo('blog')
            break

         case CardType.ALBUMS:
            goTo('album')
            break

         case CardType.TEAM:
            goTo('team')
            break

         case CardType.EVENTS:
            goTo('events')
            break

         default: break
      }
   }

   return (
      <Grid
         item
         xs={12}
         sm={6}
      >
         <Card onClick={onChange}>
            <CardActionArea
               sx={{
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
               }}
            >
               <CardMedia
                  component="img"
                  height="180px"
                  image={mock ? addImg : card.photoSrc}
                  alt={card.title}
                  style={photoStyles}
               />

               <Container sx={{ mt: 1, pb: 2 }}>
                  { card.beforeTitle &&
                     <CardText mock={mock}>
                        {card.beforeTitle}
                     </CardText>
                  }

                  <CardText mock={mock} sx={{ fontSize: '1.3rem' }}>
                     {card.title}
                  </CardText>

                  { card.afterTitle &&
                     <CardText>
                        {card.afterTitle}
                     </CardText>
                  }

                  { card.date &&
                     <CardText gutterBottom>
                        {formatedDate}
                     </CardText>
                  }

                  { card.text &&
                     <CardText
                        color={'text.secondary'}
                        sx={{
                           fontSize: '.9rem',
                           fontWeight: 400,
                           mb: 0
                        }}
                        mock={mock}
                     >
                        {card.text}
                     </CardText>
                  }
               </Container>
            </CardActionArea>
         </Card>
      </Grid>
   )
}

export default ListItem