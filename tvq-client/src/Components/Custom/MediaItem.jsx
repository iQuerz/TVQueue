import {
  Card,
  CardActionArea,
  CardMedia,
  Typography,
  CardContent,
  Button,
  CardActions,
} from "@mui/material";
import { useState } from "react";

function MediaItem(props) {
    const [hover, setHover] = useState(false);

  return (
    <Card sx={{ maxWidth: 400 }}>
      <CardActionArea
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}>
        <CardMedia
          sx={{ height: 150}}
          image={props.media.picture}
          title={props.media.name}

        />
              </CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.media.name}
          </Typography>
            <Typography variant="body2" color="text.secondary">
                {props.media.description}
            </Typography>
        </CardContent>        
        <CardActions>
            <Button size="small">More</Button>
            <Button size="small">Add to</Button>
          </CardActions>

    </Card>
  );
}

export default MediaItem;
