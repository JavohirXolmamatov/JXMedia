import { Link, NavLink, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Apiservice } from "../service/api.service";
import ReactPlayer from "react-player";
import { Avatar, Box, Chip, Stack, Typography } from "@mui/material";
import {
  CheckCircle,
  FavoriteOutlined,
  MarkChatRead,
  Tag,
  Visibility,
} from "@mui/icons-material";
import Videos from "../videos/Videos";

function VideoDetail() {
  const { id } = useParams();
  const [videoDetail, setVedioDetail] = useState(null);
  const [relatedVideo, setRelatedVideo] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await Apiservice.fetching(
          `videos?part=snippet,statistics&id=${id}`
        );
        setVedioDetail(data.data.items[0]);
        const relateData = await Apiservice.fetching(
          `search?part=snippet&&relatedToVideoId=${id}`
        );
        setRelatedVideo(relateData.data.items);
        console.log(relateData);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, [id]);

  if (!videoDetail) return <div>Loading...</div>;

  console.log(videoDetail.snippet.channelId);

  return (
    <Box minHeight={"90vh"} mb={10} mt={10}>
      <Box display={"flex"} sx={{ flexDirection: { xs: "column", md: "row" } }}>
        <Box width={{ xs: "100%", md: "75%" }}>
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${id}type=video`}
            className="react-player"
            controls
          />
          {videoDetail.snippet.tags.map((item, index) => (
            <Chip
              label={item}
              key={index}
              sx={{ marginTop: "10px", cursor: "pointer", ml: "10px" }}
              deleteIcon={<Tag />}
              onDelete={() => {}}
              variant="outlined"
            />
          ))}
          <Typography variant="h5" p={2}>
            {videoDetail.snippet.title}
          </Typography>
          <Typography variant="subtitle2" p={2} sx={{ opacity: "0.7" }}>
            {videoDetail.snippet.description}
          </Typography>
          <Stack
            direction={"row"}
            gap={"20px"}
            alignItems={"center"}
            py={1}
            px={2}
          >
            <Stack
              sx={{ opacity: "0.7" }}
              direction={"row"}
              alignItems={"center"}
              gap={"3px"}
            >
              <Visibility />
              {parseInt(videoDetail.statistics.viewCount).toLocaleString()}{" "}
              views
            </Stack>
            <Stack
              sx={{ opacity: "0.7" }}
              direction={"row"}
              alignItems={"center"}
              gap={"3px"}
            >
              <FavoriteOutlined />
              {parseInt(videoDetail.statistics.likeCount).toLocaleString()}{" "}
              views
            </Stack>
            <Stack
              sx={{ opacity: "0.7" }}
              direction={"row"}
              alignItems={"center"}
              gap={"3px"}
            >
              <MarkChatRead />
              {parseInt(
                videoDetail.statistics.commentCount
              ).toLocaleString()}{" "}
              views
            </Stack>
          </Stack>
          <NavLink to={`/channel/${videoDetail?.snippet?.channelId}`}>
            <Stack
              direction="row"
              alignItems={"center"}
              gap={"5px"}
              marginTop={"5px"}
            >
              <Avatar
                alt={videoDetail.snippet.channelTitle}
                src={videoDetail.snippet.thumbnails.default.url}
              />
              <Typography>
                {videoDetail.snippet.channelTitle}
                <CheckCircle
                  sx={{ fontSize: "12px", color: "gray", ml: "5px" }}
                />
              </Typography>
            </Stack>
          </NavLink>
        </Box>
        <Box
          width={{ xs: "100%", md: "25%" }}
          px={2}
          py={{ md: 1, xs: 5 }}
          justifyContent={"center"}
          alignItems={"center"}
          overflow={"scroll"}
          maxHeight={"120vh"}
        >
          <Videos item={relatedVideo} />
        </Box>
      </Box>
    </Box>
  );
}

export default VideoDetail;
