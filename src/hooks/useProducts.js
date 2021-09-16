import {useQuery} from 'react-query';
import axios from 'axios';
import API_URL from '../helper/apiHelper';

export default function useProducts() {

    return useQuery('products', async () => {
        const result = await axios.get(`${API_URL}/products`);
        return result.data;
    });   
}
