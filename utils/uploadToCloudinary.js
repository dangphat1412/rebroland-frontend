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
      form,
      {
        headers: { "X-Requested-With": "XMLHttpRequest" },
      }
    );
    return res.data.url;
  } catch (error) {
    return;
  }
};

export const uploadMultipleMedia = async (files) => {
  try {
    const uploaders = files.map(async (file) => {
      if (file && file.image) return file.image;
      const form = new FormData();
      form.append("file", file);
      form.append("upload_preset", "social_media");
      form.append("cloud_name", "indersingh");
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dlwn4tpuz/image/upload/",
        form,
        {
          headers: { "X-Requested-With": "XMLHttpRequest" },
        }
      );
      return res.data.url;
    });
    const data = await axios.all(uploaders);
    return data;
  } catch (error) {
    return;
  }
};
