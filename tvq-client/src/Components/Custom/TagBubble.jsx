import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";


function TagBubble(props) {
  return (
    <Box className="tag-bubble">
        <Typography variant="h6">{props.tag.name}</Typography>
    </Box>
  );
}

export default TagBubble;
