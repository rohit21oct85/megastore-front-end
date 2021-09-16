import {useQuery} from 'react-query';
import axios from 'axios';
import { useParams } from 'react-router';
import API_URL from '../helper/apiHelper';

export default function useCategoryProducts() {
    const params = useParams();
    const slug = params?.slug;  
    return useQuery(`categories-${slug}`, async () => {
        const result = await axios.get(`${API_URL}/categories/${slug}`);
        return result.data;
    });   
}
