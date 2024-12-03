import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Apiservice } from "../service/api.service";
import { Box, Container } from "@mui/material";
import ChannelItems from "../channel-items/ChannelItems";
import Videos from "../videos/Videos";
function Channel() {
  const { id } = useParams();
  const [channelDetail, setChannelDetail] = useState();
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const dataChannelDetail = await Apiservice.fetching(
        `channels?part=snippet&id=${id}`
      );
      setChannelDetail(dataChannelDetail.data.items[0]);
      const dataVideo = Apiservice.fetching(
        `search?channelId=${id}&part=snippet`
      );

      setVideos((await dataVideo).data.items);
    };
    getData();
  }, [id]);
  return (
    <Box minHeight={"95vh"} mt={"10vh"}>
      <Box>
        <ChannelItems item={channelDetail} />
      </Box>
      <Container maxWidth={"90%"}>
        <Videos item={videos} />
      </Container>
    </Box>
  );
}

export default Channel;
