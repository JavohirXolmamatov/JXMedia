import { NavLink, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Apiservice } from "../service/api.service";
import ReactPlayer from "react-player";
import { Box, Chip, Stack, Typography } from "@mui/material";
import {
  CheckCircle,
  FavoriteOutlined,
  MarkChatRead,
  Tag,
  Visibility,
} from "@mui/icons-material";
import Videos from "../videos/Videos";
import Loader from "../loader/Loader";

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

  if (!videoDetail)
    return (
      <div>
        <Loader />
      </div>
    );

  console.log(videoDetail.snippet.channelId);

  return (
    <section className="md:w-[90%] w-full p-2 mx-auto pt-10">
      <Box display={"flex"} sx={{ flexDirection: { xs: "column", md: "row" } }}>
        <Box width={{ xs: "100%", md: "75%" }}>
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${id}type=video`}
            className="react-player "
            controls
          />
          {videoDetail.snippet.tags.map((item, index) => (
            <Chip
              label={item}
              key={index}
              sx={{
                marginTop: "10px",
                cursor: "pointer",
                ml: "10px",
              }}
              deleteIcon={<Tag />}
              onDelete={() => {}}
              variant="outlined"
            />
          ))}
          <p className="p-2">{videoDetail.snippet.title}</p>
          <h2 className="p-2 opacity-70 overflow-hidden max-h-[300px]">
            {videoDetail.snippet.description}
          </h2>
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
              <img
                className="rounded-full size-12 mx-2"
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
        <section className="w-full mx-auto my-4 md:my-0">
          <Videos item={relatedVideo} />
        </section>
      </Box>
    </section>
  );
}

export default VideoDetail;
