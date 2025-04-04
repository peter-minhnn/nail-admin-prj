import { apiGuestRoutes } from "@/config/guest.api.route"
import { ContactDataType } from "@/entities/(guest)/contact"
import { useGlobalAxios } from "@/hooks/use-axios"
import { BaseResponseType } from "@/types"
import { handleApiCatchResponse, handleApiResponse } from "../api.service"

export const sendRequests = async (data: ContactDataType) => {
    const formData = new FormData()
    formData.append('firstName', data.name)
    formData.append('lastName', data.name)
    formData.append('email', data.email)
    formData.append('phoneNumber', data.phone)
    formData.append('subject', data.topic)
    formData.append('content', data.content ?? "")

    try {
        const response = await useGlobalAxios.postFormData<
            null,
            BaseResponseType,
            FormData
        >(apiGuestRoutes.contact.general, formData)
        return handleApiResponse<any>(response)
    } catch (e) {
        return handleApiCatchResponse<any>(e)
    }
}
