import axios from 'axios';
import Swal from 'sweetalert2';
import { useResponseHandler } from './useResponseHandler';
import ErrorBoundary from '../utility/utils';

const axiosInstance = axios.create({
  baseURL: 'http://opening.micropiranti.id/api/', // untuk Ganti dengan URL dasar API
  timeout: 10000, // Waktu timeout request
  
});

export const useApi = () => {
  const { startLoading, stopLoading, setErrorMsg, clearError } = useResponseHandler();

  const getRequest = async (url, params = {}) => {
    startLoading();
    clearError();
    try {
      const response = await axiosInstance.get(url, { params });
      if(response.status !== 200) {
        return <ErrorBoundary fallback={response.statusText}/>
      } 

      return response.data;
    } catch (error) {
      Swal.error({
        title: "Error",
        text: error.response ? error.response.data : 'Network Error',
        icon: "error"
      })
      throw error;
    } finally {
      stopLoading();
    }
  };

  const postRequest = async (url, data) => {
    startLoading();
    clearError();
    try {
      const response = await axiosInstance.post(url, data);
      if(response.status !== 200) {
        Swal.error({
          title: "Error",
          text: response.message,
          icon: "error"
        })
      }
      return response.data;
    } catch (error) {
      setErrorMsg(error.response ? error.response.data : 'Network Error');
      throw error;
    } finally {
      stopLoading();
    }
  };

  return { getRequest, postRequest };
};