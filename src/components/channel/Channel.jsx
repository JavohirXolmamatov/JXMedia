import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Apiservice } from "../service/api.service";
import ChannelItems from "../channel-items/ChannelItems";
import Videos from "../videos/Videos";
import Loader from "../loader/Loader";
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

      setVideos((await dataVideo).data?.items);
    };
    getData();
  }, [id]);

  if (!channelDetail) {
    return <Loader />;
  }
  return (
    <section className="w-full">
      <section>
        <ChannelItems item={channelDetail} />
      </section>
      <section>
        <Videos item={videos} />
      </section>
    </section>
  );
}

export default Channel;
