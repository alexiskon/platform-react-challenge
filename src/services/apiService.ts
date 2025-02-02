import axios from "axios";
import { CatImageType, CatImageByIdType, BreedType, FavouritesType, PostFavouriteType } from "./apiTypes";

const baseUrl = import.meta.env.VITE_BASE_URL;
const sub_id = import.meta.env.VITE_SUB_ID as string;

const headers = {
    'x-api-key' : import.meta.env.VITE_API_KEY
}

export const fetchCatImages = async (limit: number = 10): Promise<CatImageType[]> => {
    try {
        const response = await axios.get(`${baseUrl}/v1/images/search?limit=${limit}&has_breeds=true`, {headers});
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching cat images: ${error}`);
    }
}

export const fetchCatDetailsById = async (id: string): Promise<CatImageByIdType> => {
    try {
        const response = await axios.get(`${baseUrl}/v1/images/${id}`, {headers});
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching cat images: ${error}`);
    }
}

export const fetchFavourites = async (): Promise<FavouritesType[]> => {
    try {
        const response = await axios.get(`${baseUrl}/v1/votes?sub_id=${sub_id}`, {headers});
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching cat images: ${error}`);
    }
}

export const postFavourite = async (image_id: number | string): Promise<PostFavouriteType> => {
    try {
        const payload = {image_id, sub_id, value: 1};
        const response = await axios.post(`${baseUrl}/v1/votes`, payload, {headers});
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching cat images: ${error}`);
    }
}

export const removeFavourite = async (image_id: number | string): Promise<PostFavouriteType> => {
    try {
        const payload = {image_id, sub_id, value: -1};
        const response = await axios.post(`${baseUrl}/v1/votes`, payload, {headers});
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching cat images: ${error}`);
    }
}

export const fetchBreeds = async (): Promise<BreedType[]> => {
    try {
        const response = await axios.get(`${baseUrl}/v1/breeds`, {headers});
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching cat images: ${error}`);
    }
}

export const fetchBreedImages = async (breedId: string): Promise<CatImageByIdType[]> => {
    try {
        const response = await axios.get(`${baseUrl}/v1/images/search?breed_ids=${breedId}`, {headers});
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching cat images: ${error}`);
    }
}