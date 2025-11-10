import axios from "axios"
import { config } from "../../config"

export const post = async (endpoint:string, params:any) => {
    try {
        const response = await axios.post(
            `${config?.token}/${endpoint}`,
            params,

        )
    } catch (error) {
        
    }
}