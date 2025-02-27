import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { IMGS_URL } from '../../../config';

const CardInfo = ({ name, location, image }) => {

  return (
    <Card sx={{ maxWidth: 345, mt: 2, display: 'flex', flexDirection: 'column', height: '100%', width: '265px' }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="320"
        image={`${IMGS_URL}/${image}`}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent >
        <Typography gutterBottom variant="h6" component="div" sx={{
          textAlign: 'center',
          height: 58,
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical'
          }}>
          {name}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {location}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between' }}>
        <Button size="small">Learn More</Button>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
} 


export default CardInfo;