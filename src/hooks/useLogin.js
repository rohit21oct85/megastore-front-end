import {useMutation} from 'react-query'
import axios from 'axios'
import API_URL from '../helper/apiHelper';

export default function useLogin() {      
      return useMutation(formData => {
            return axios.post(`${API_URL}/auth/local`, formData)
        })
}
