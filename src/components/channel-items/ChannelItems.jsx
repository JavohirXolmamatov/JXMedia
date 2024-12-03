import { CheckCircle } from "@mui/icons-material";
import { Stack, Box, CardMedia, Typography, CardContent } from "@mui/material";
import { Link } from "react-router-dom";

function ChannelItems({ item }) {
  return (
    <Box
      sx={{
        boxShadow: "none",
        borderRadius: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: { xs: "356px", md: "320px" },
        height: "326px",
        margin: "auto",
      }}
    >
      <Link
        to={`/channel/${item?.id?.channelId ? item?.id?.channelId : item?.id}`}
      >
        <CardContent
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <CardMedia
            image={item?.snippet?.thumbnails?.high?.url}
            alt={item?.snippet?.title}
            sx={{
              borderRadius: "50%",
              height: "180px",
              width: "180px",
              mb: 2,
              border: "1px solid #e3e3e3",
              textAlign: "center",
            }}
          />
          <Typography textAlign={"center"} variant="h4">
            {item?.snippet.title} <CheckCircle />
          </Typography>
          {item?.statistics?.subscriberCount && (
            <Typography
              sx={{ fontSize: "15px", fontWeight: 500, color: "gray" }}
            >
              {parseInt(item?.statistics?.subscriberCount).toLocaleString(
                "en-US"
              )}
              Subscribers
            </Typography>
          )}
        </CardContent>
      </Link>
    </Box>
  );
}

export default ChannelItems;
