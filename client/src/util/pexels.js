import { createClient } from "pexels";

const client = createClient(
  "563492ad6f9170000100000190245e70f4924268830855cbfc902fd1"
);
const query = "profile";

export const searchPexels = async (callback) => {
  try {
    const { photos } = await client.photos.search({ query, per_page: 1 });

    console.log("PEXELS ", photos);

    callback(photos);
  } catch (e) {
    console.log(e);
  }
};
