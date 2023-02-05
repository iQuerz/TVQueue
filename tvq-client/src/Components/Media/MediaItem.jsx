import {
    Card,
    CardActionArea,
    CardMedia,
    Typography,
    CardContent,
    Button,
    CardActions,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";

function MediaItem(props) {
    const [hover, setHover] = useState(false);

    return (
        <Card className={props.className} sx={{ minWidth:"12em", width:"12em", height:"23em" }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}>
            <Box className="flex-down" sx={{justifyContent:"space-between", height:"100%"}}>
                <CardActionArea>
                    <CardMedia
                        sx={{ height: "15em" }}
                        title={props.media.name}
                        image={props.media.picture}
                    />
                </CardActionArea>
                <CardContent>
                    <Typography variant="h6" component="div">
                        {props.media.name}
                    </Typography>
                </CardContent>

                <CardActions className="flex-right">
                    <Button size="medium">More</Button>
                    <Button size="medium">Add to</Button>
                </CardActions>
            </Box>
        </Card>
    );
}

export default MediaItem;