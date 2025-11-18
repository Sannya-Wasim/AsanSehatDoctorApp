import { useSelector } from 'react-redux';
import { RootState } from '../store';
import axios from 'axios';
import { config } from '../config';

export const useApi = () => {
  const token = useSelector((state: RootState) => state.auth.user?.token);


 const AUTH = async (url: string, data: any, ) => {
  try {
    const response = await axios?.post(`${config?.baseUrl}${url}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response?.data;
  } catch (error) {
    throw error;
  }
};

 const POST = async ( url: string, data: any) => {
  try {
    const response = await axios?.post(`${config?.baseUrl}${url}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `${token}`,
      },
    });
      return response?.data;
  } catch (error) {
    throw error;
  }
};

return { POST, AUTH };
};
