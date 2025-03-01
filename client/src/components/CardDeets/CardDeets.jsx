import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { IMGS_URL } from '../../../config';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { NavLink } from 'react-router-dom';

const CardDeets = ({ signInProp }) => {

  const { id } = useParams();
  
  const user = useSelector(state => state.users) || null
  const ad = useSelector(ad => ad.ads.find(item => item._id === id));

  if (!ad) {
    return <CircularProgress />
  }

  return(
    <Card sx={{  mt: 2, display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="650"
        image={`${IMGS_URL}/${ad.image}`}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent >
        <Typography gutterBottom variant="h3" component="div" sx={{
          textAlign: 'center',
          height: 58,
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical'
          }}>
          {ad.title}
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.primary', mt: 2}}>
          Opis produktu: {ad.text}
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.primary', mt: 2}}>
          Lokalizacja: {ad.location}
        </Typography>
        <Typography variant="h6" sx={{ color: 'text.primary', mt: 2}}>
          Cena: {ad.price} zł
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.primary', mt: 2}}>
          Data dodania: {ad.date}
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.primary', mt: 2}}>
          Autor ogłoszenia: {ad.author.username}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between' }}>
      {
        user && user.username === ad.author.username &&  
        (<NavLink to={`/edit/${id}`}>
          <Button size="small">Edit</Button>
        </NavLink>)
      }
      {
        user && user.username === ad.author.username &&  
        (<NavLink to={`/delete/${id}`}>
          <Button size="small">Delete</Button>
        </NavLink>)
      }
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
      </CardActions>
    </Card>
  )
};

export default CardDeets;