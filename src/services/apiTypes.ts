export interface BreedType {
    weight: {
        imperial: string;
        metric: string;
    };
    id: string;
    name: string;
    vetstreet_url: string;
    temperament: string;
    origin: string;
    country_codes: string;
    country_code: string;
    description: string;
    life_span: string;
    indoor: number;
    alt_names: string;
    adaptability: number;
    affection_level: number;
    child_friendly: number;
    dog_friendly: number;
    energy_level: number;
    grooming: number;
    health_issues: number;
    intelligence: number;
    shedding_level: number;
    social_needs: number;
    stranger_friendly: number;
    vocalisation: number;
    experimental: number;
    hairless: number;
    natural: number;
    rare: number;
    rex: number;
    suppressed_tail: number;
    short_legs: number;
    wikipedia_url: string;
    hypoallergenic: number;
    reference_image_id: string;
    image: {
        id: string;
        width: number;
        height: number;
        url: string;
    };
}

export interface CatImageType {
    id: string;
    url: string;
    width: number;
    height: number;
}

export interface CatBreedType {
    adaptability: number;
    affection_level: number;
    bidability: number;
    cat_friendly: number;
    cfa_url: string;
    child_friendly: number;
    country_code: string;
    country_codes: string;
    description: string;
    dog_friendly: number;
    energy_level: number;
    experimental: number;
    grooming: number;
    hairless: number;
    health_issues: number;
    hypoallergenic: number;
    id: string;
    indoor: number;
    intelligence: number;
    lap: number;
    life_span: string;
    name: string;
    natural: number;
    origin: string;
    rare: number;
    reference_image_id: string;
    rex: number;
    shedding_level: number;
    short_legs: number;
    social_needs: number;
    stranger_friendly: number;
    suppressed_tail: number;
    temperament: string;
    vcahospitals_url: string;
    vetstreet_url: string;
    vocalisation: number;
    weight: {
        imperial: string;
        metric: string;
    };
    wikipedia_url: string;
}

export interface CatImageByIdType {
    id: string;
    url: string;
    width: number;
    height: number;
    breeds: CatBreedType[]
}

export interface FavouritesType {
    id: number | string;
    image_id: string | number;
    sub_id: string;
    created_at: string;
    value: number;
    country_code: string;
    image: {
        id: string;
        url: string;
    }
}

export interface PostFavouriteType {
    message: string;
    id: number;
    image_id: string;
    sub_id?: string;
    value: number;
    country_code?: string;
}