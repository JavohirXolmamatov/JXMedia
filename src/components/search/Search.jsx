import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Apiservice } from "../service/api.service";
import { Stack, Box, Typography } from "@mui/material";
import VideoItems from "../video-items/VideoItems";
import ChannelItems from "../channel-items/ChannelItems";
import { colors } from "../../constant/colors";
import Loader from "../loader/Loader";

function Search() {
  const [videos, setVideos] = useState([]);
  const { id } = useParams();
  const [isPending, setisPending] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setisPending(true);
      try {
        const data = await Apiservice.fetching(`search?part=snippet&q=${id}`);
        setVideos(data.data.items);
        setisPending(false);
        if (data.data.error) {
          throw new Error([data.data.error.code, data.data.error.message]);
        }
      } catch (err) {
        console.log(err);
        setisPending(false);
      }
    };
    getData();
  }, [id]);

  return (
    <section className="w-[90%] mx-auto">
      <Typography variant="h4" fontWeight={"bold"} mb={4}>
        Search result for{" "}
        <span style={{ color: colors.secondary }} className="capitalize">
          {id}
        </span>{" "}
        videos
      </Typography>
      <section className="w-full flex flex-wrap gap-6 justify-start">
        {isPending ? (
          <Loader />
        ) : (
          videos &&
          videos.map((item) => (
            <Box key={item.id.videoId}>
              {item.id.videoId && <VideoItems item={item} />}
              {item.id.channelId && <ChannelItems item={item} />}
            </Box>
          ))
        )}
      </section>
    </section>
  );
}

export default Search;
