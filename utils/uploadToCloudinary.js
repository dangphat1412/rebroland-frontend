import axios from "axios";

export const uploadMedia = async (media) => {
  try {
    if (media && media.image) return media.image;
    const form = new FormData();
    form.append("file", media);
    form.append("upload_preset", "social_media");
    form.append("cloud_name", "indersingh");
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/dlwn4tpuz/image/upload/",
      form
    );
    return res.data.url;
  } catch (error) {
    return;
  }
};

export const uploadMultipleMedia = async (files) => {
  try {
    return Promise.all(files.map((media) => uploadMedia(media)));
  } catch (error) {
    return;
  }
};
