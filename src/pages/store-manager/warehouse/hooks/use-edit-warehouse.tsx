import { useMutation, useQueryClient } from "@tanstack/react-query"
import axiosInstance from "@/lib/axios-instance"
import type { IApiErrorResponse, IApiResponseType } from "@/lib/type"
import { toast } from "react-toastify"
import { END_POINT } from "@/constant/end-point"
import { KEYS } from "@/constant/keys"
import type { WarehouseFormSchemaType } from "../schema"
import type { IWarehouse } from "../type"

const useEditWarehouse = (warehouse: IWarehouse, onSuccess: () => void) => {
  const queryClient = useQueryClient()

  const editWarehouse = async (data: WarehouseFormSchemaType) => {
    const payload = {
      type: data.type,
      name: data.name,
      code: data.code,
      description: data.description,
      status: "ACTIVE",
      isDefault: true,
      province: data.province,
      district: data.district,
      municipality: data.municipality,
      wardNo: data.wardNo,
      streetName: data.streetName,
      landmark: data.landmark,
      warehouseId: data.warehouseId,
      productId: data.productId,
      productStock: data.productStock,
      quantity: data.quantity,
      contact: {
        contactName: data.contactName,
        contactEmail: data.contactEmail,
        contactPhone: data.contactPhone,
        isPrimary: data.isPrimary,
      },
      address: {
        addressLine1: data.addressLine1,
        addressLine2: data.addressLine2,
        city: data.city,
        state: data.state,
        postalCode: data.postalCode,
        country: data.country,
        mapUrl: data.mapUrl,
      },
    }
    const response = await axiosInstance.put(
      END_POINT.WAREHOUSE.UPDATE.replace(":id", warehouse.id),
      payload
    )
    return response.data
  }

  const { mutate, isPending, error } = useMutation<
    IApiResponseType<IWarehouse>,
    IApiErrorResponse,
    WarehouseFormSchemaType
  >({
    mutationFn: editWarehouse,
    onSuccess: (res) => {
      onSuccess()
      queryClient.invalidateQueries({ queryKey: [KEYS.warehouses] })
      toast.success(res?.message ?? "Warehouse updated successfully")
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          "Failed to update warehouse. Please try again."
      )
    },
  })

  return {
    isPending,
    error,
    editWarehouse: mutate,
  }
}

export default useEditWarehouse
