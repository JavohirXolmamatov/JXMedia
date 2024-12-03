import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Apiservice } from "../service/api.service";
import { Stack, Box, Typography } from "@mui/material";
import VideoItems from "../video-items/VideoItems";
import ChannelItems from "../channel-items/ChannelItems";
import { colors } from "../../constant/colors";

function Search() {
  const [videos, setVideos] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await Apiservice.fetching(`search?part=snippet&q=${id}`);
        setVideos(data.data.items);
        if (data.data.error) {
          throw new Error([data.data.error.code, data.data.error.message]);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, [id]);

  return (
    <Stack pt={"100px"}>
      <Typography variant="h4" fontWeight={"bold"} mb={4}>
        Search result for <span style={{ color: colors.secondary }}>{id}</span>{" "}
        videos
      </Typography>
      <Stack
        direction="row"
        flexWrap={"wrap"}
        justifyContent={"space-start"}
        alignItems={"start"}
        gap={3}
      >
        {videos &&
          videos.map((item) => (
            <Box key={item.id.videoId}>
              {item.id.videoId && <VideoItems item={item} />}
              {item.id.channelId && <ChannelItems item={item} />}
            </Box>
          ))}
      </Stack>
    </Stack>
  );
}

export default Search;
