import {
  Avatar,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import { colors } from "../../constant/colors";
import moment from "moment";
import { CheckCircle } from "@mui/icons-material";
import Loader from "../loader/Loader";
import { NavLink } from "react-router-dom";
import Videos from "../videos/Videos";

function VideoItems({ item }) {
  return (
    <Card
      className="1111"
      sx={{
        width: { xs: "100%", sm: "360px", md: "320px" },
        boxShadow: "none",
      }}
    >
      <NavLink to={`/video/${item.id.videoId}`}>
        <CardMedia
          image={item?.snippet?.thumbnails?.high?.url}
          alt={item?.snippet?.title}
          sx={{ width: "360px  ", height: "180px" }}
        />
      </NavLink>
      <CardContent
        sx={{
          position: "relative",
          background: colors.primary,
          height: "220px",
        }}
      >
        <NavLink to={`video/${item.id.videoId}`}>
          <>
            <Typography
              my={"5px"}
              sx={{ color: colors.secondary, opacity: "0.6" }}
            >
              {moment(item?.snippet?.publishedAt).fromNow()}
            </Typography>
            <Typography
              gutterBottom
              variant="subtitle1"
              component="div"
              fontWeight={"bold"}
            >
              {item?.snippet?.title.slice(0, 50)}
            </Typography>
            <Typography
              gutterBottom
              variant="subtitle2"
              component="div"
              sx={{ opacity: "0.6" }}
            >
              {item?.snippet?.description.slice(0, 70)}
            </Typography>
          </>
        </NavLink>

        <NavLink to={`channel/${item.snippet.channelId}`}>
          <>
            <Stack
              direction={"row"}
              position={"absolute"}
              bottom={"10px"}
              alignItems={"center"}
              gap={"10px"}
            >
              <Avatar
                src={item?.snippet?.thumbnails?.high?.url}
                sx={{ height: "35px", width: "35px" }}
              ></Avatar>
              <Typography variant={"subtitle2"} color="gray">
                {item?.snippet?.channelTitle}
                <CheckCircle
                  sx={{ fontSize: "12px", color: "gray", ml: "5px" }}
                />
              </Typography>
            </Stack>
          </>
        </NavLink>
      </CardContent>
    </Card>
  );
}

export default VideoItems;
