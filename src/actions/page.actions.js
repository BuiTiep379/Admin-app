import axiosIntance from "../helpers/axios";
import axiosInstance from "../helpers/axios";
import { pageConstants } from "./constants"


export const createPage = (form) => {
    return async dispatch => {
        dispatch({ type: pageConstants.CREATE_NEW_PAGE_REQUEST });
        const res = await axiosInstance.post(`/page/create`, form);
        try {
            if (res.status === 201) {
                dispatch({ 
                    type: pageConstants.CREATE_NEW_PAGE_SUCCESS,
                    payload: { page: res.data.page }
                })
            } else {
                dispatch({ 
                    type: pageConstants.CREATE_NEW_PAGE_FAILURE,
                    payload: { error: res.data.error }
                })
            } 
        } catch (error) {
            console.log(error);
        }
        
    }
}

