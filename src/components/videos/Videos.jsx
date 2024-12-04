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
    // Agar `item` mavjud bo'lsa, loaderni o'chirish
    if (item) {
      setIsPending(false);
    } else {
      const getData = async () => {
        setIsPending(true);
        try {
          const data = await Apiservice.fetching(
            `search?part=snippet&q=${selectedCategory}`
          );
          setVideos(data.data.items || []);
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
    <Stack pt={"80px"} minHeight={"100vh"}>
      {/* Faqat item yo'q bo'lsa, kategoriya komponentini ko'rsatish */}
      {!item && (
        <>
          <Category
            selectedCategoryHandle={selectedCategoryHandle}
            selectedCategory={selectedCategory}
          />
          <Typography variant={"h4"} fontWeight={"bold"} mb={2}>
            {selectedCategory || "No category selected"}{" "}
            <span style={{ color: colors.secondary }}>videos</span>
          </Typography>
        </>
      )}

      {/* Loader */}
      {isPending && <Loader />}

      {/* Ma'lumotlarni render qilish */}
      <Stack
        direction="row"
        flexWrap={"wrap"}
        justifyContent={"start"}
        alignItems={"start"}
        gap={3}
      >
        {item
          ? item.map((video) => (
              <Box key={video.id.videoId || video.id.channelId}>
                {video.id.videoId && <VideoItems item={video} />}
                {video.id.channelId && <ChannelItems item={video} />}
              </Box>
            ))
          : videos.map((video) => (
              <Box key={video.id.videoId || video.id.channelId}>
                {video.id.videoId && <VideoItems item={video} />}
                {video.id.channelId && <ChannelItems item={video} />}
              </Box>
            ))}
      </Stack>
    </Stack>
  );
}

export default Videos;
