import { Platform } from "react-native";


export const API_URL =
  Platform.OS === "android" || Platform.OS === "ios"
    ? "http://10.239.74.92:3000"
    : "http://localhost:3000";

    export const CLOUDINARY_CLOUD_NAME = "den96laug";
    export const CLOUDINARY_UPLOAD_PRESET = "images";