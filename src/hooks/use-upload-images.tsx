import axiosInstance from "@/lib/axios-instance"
import { END_POINT } from "@/constant/end-point"
import { BASE_URL } from "@/utils/base-url"
import uploadImage from "./use-upload-image"

const uploadMultiImage = async (file: File) => {
  const formData = new FormData()

  formData.append("file", file)

  const response = await axiosInstance.post(END_POINT.UPLOAD, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })

  const url = BASE_URL + response.data.data.url
  return url
}

/**
 * Uploads multiple files through the same single-image endpoint and returns
 * their URLs in the same order as the input files — e.g. for
 * `productImage: ["/uploads/.../front.png", "/uploads/.../back.png"]`.
 *
 * Runs uploads in parallel. If one file fails, Promise.all rejects and
 * none of the URLs are returned — catch this at the call site and decide
 * whether to retry, or switch to Promise.allSettled if partial success
 * (some images uploaded, some failed) should be tolerated instead.
 */
export const uploadImages = async (files: File[]): Promise<string[]> => {
  return Promise.all(files.map((file) => uploadImage(file)))
}

export default uploadMultiImage
