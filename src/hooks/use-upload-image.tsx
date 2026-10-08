import axiosInstance from "@/lib/axios-instance"
import { END_POINT } from "@/constant/end-point"
import { BASE_URL } from "@/utils/base-url"

const uploadImage = async (file: File) => {
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

export default uploadImage
