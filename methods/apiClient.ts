import { useSelector } from 'react-redux';
import { RootState } from '../store';
import axios from 'axios';
import { config } from '../config';

export const AUTH = async (url: string, data: any, ) => {
  try {
    const response = axios?.post(`${config?.baseUrl}${url}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response?.data;
  } catch (error) {
    throw error;
  }
};

export const POST = async (data: any, url: string) => {
  const user = useSelector((state: RootState) => state?.auth?.user);
  try {
    const response = axios?.post(`${config?.baseUrl}${url}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `${user?.token}`,
      },
    });
      return response?.data;
  } catch (error) {
    throw error;
  }
};
