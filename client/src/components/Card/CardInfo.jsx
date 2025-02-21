import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';

const CardInfo = () => {
  return (
    <Card sx={{ maxWidth: 345, mt: 2 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="320"
        image="./public/img/vee.jpg"
        sx={{ objectFit: 'cover' }}
      />
      <CardContent >
        <Typography gutterBottom variant="h5" component="div" sx={{ textAlign: 'center' }}>
          Lizard
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Gdańsk
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