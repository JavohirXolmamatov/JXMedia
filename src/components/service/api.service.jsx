import axios from "axios";

const BASE_URL = "https://youtube-v31.p.rapidapi.com";

const options = {
  params: {
    maxResults: "50",
  },
  headers: {
    "x-rapidapi-key": import.meta.env.VITE_API_KEY,
    "x-rapidapi-host": "youtube-v31.p.rapidapi.com",
  },
};

export const Apiservice = {
  async fetching(url) {
    const response = await axios.get(`${BASE_URL}/${url}`, options);
    return response;
  },
};

// const fetchData = async () => {
//   try {
//     const { data } = await axios.get(BASE_URL, {
//       ...options,
//       params: { maxResults: 50 },
//     });
//     console.log(data);
//   } catch (err) {
//     console.error("Error fetching data:", err.message);
//   }
// };

// fetchData();
