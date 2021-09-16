
import {useHistory} from 'react-router-dom'
import {useMutation} from 'react-query'
import axios from 'axios'
import API_URL from '../helper/apiHelper';
import { useToasts } from 'react-toast-notifications';

export default function useRegister() {
      const history = useHistory();
        
      const { addToast } = useToasts();
      return useMutation(formData => {
            return axios.post(`${API_URL}/auth/local/register`, formData)
        },{
            onSuccess: () => {
                addToast('Registerd successfully', { appearance: 'success', autoDismiss: true });
                history.push(`/login`)
            }
        });
      
}
