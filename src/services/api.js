import axios from "axios";

const ACCESS_KEY = "3fVELsdVAWjkN4NYyiQLz-7BEgN4Vto6dGw-VU_D45A";

export const fetchImages = async (query, page, per_page, signal) => {
  const response = await axios.get(`https://api.unsplash.com/search/photos?query=${query}&page=${page}&per_page=${per_page}`, { headers: {
    Authorization: `Client-ID ${ACCESS_KEY}`,
  }, signal } );

  return response.data;
};
