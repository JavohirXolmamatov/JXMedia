import { Box, Stack, Typography } from "@mui/material";
import VideoItems from "../video-items/VideoItems";
import ChannelItems from "../channel-items/ChannelItems";
import { useState, useEffect } from "react";
import Category from "../category/Category";
import { Apiservice } from "../../components/service/api.service";
import { colors } from "../../constant/colors";
import Loader from "../loader/Loader";

function Videos({ item }) {
  const [selectedCategory, setSelectedCategory] = useState("New");
  const [videos, setVideos] = useState([]);
  const [isPending, setIsPending] = useState(true);

  const selectedCategoryHandle = (category) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    if (item) {
      setIsPending(false);
    } else {
      const getData = async () => {
        setIsPending(true);
        try {
          const data = await Apiservice.fetching(
            `search?part=snippet&q=${selectedCategory}`
          );
          setVideos(data?.data?.items || []);
          setIsPending(false);
        } catch (err) {
          console.error(err);
        } finally {
          setIsPending(false);
        }
      };

      getData();
    }
  }, [selectedCategory, item]); // `item`ga ham bog'langan

  return (
    <section className="md:w-[90%] w-full p-3 mx-auto">
      {/* Faqat item yo'q bo'lsa, kategoriya komponentini ko'rsatish */}
      {!item && (
        <div className="w-full">
          <Category
            selectedCategoryHandle={selectedCategoryHandle}
            selectedCategory={selectedCategory}
          />
          <Typography variant={"h4"} fontWeight={"bold"} mb={2}>
            {selectedCategory || "No category selected"}{" "}
            <span style={{ color: colors.secondary }}>videos</span>
          </Typography>
        </div>
      )}

      {/* Loader */}
      {isPending && <Loader />}

      {/* Ma'lumotlarni render qilish */}
      <div className="flex flex-wrap gap-8 w-full mx-auto ">
        {item
          ? item.map((video) => (
              <Box key={video.id.videoId || video.id.channelId}>
                {video?.id?.videoId && <VideoItems item={video} />}
                {video?.id?.channelId && <ChannelItems item={video} />}
              </Box>
            ))
          : videos.map((video) => (
              <Box key={video?.id?.videoId || video?.id?.channelId}>
                {video?.id?.videoId && <VideoItems item={video} />}
                {video?.id?.channelId && <ChannelItems item={video} />}
              </Box>
            ))}
      </div>
    </section>
  );
}

export default Videos;
