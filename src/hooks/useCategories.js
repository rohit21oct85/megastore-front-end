import {useQuery} from 'react-query';
import axios from 'axios';
import API_URL from '../helper/apiHelper';

export default function useCategories() {
    
    return useQuery('categories', async () => {
        const result = await axios.get(`${API_URL}/categories`);
        return result.data;
    });   
}
