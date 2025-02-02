import { CatBreedType } from "../../services/apiTypes";

interface formatedObj {
    title: string;
    value: number | string;
}

export function getPropertiesByType(breed: CatBreedType) {
    const filteredProperties = { numberValues: [] as formatedObj[], textValues: [] as formatedObj[] };
    Object.keys(breed).forEach((key) => {
        const value = breed[key as keyof CatBreedType];
        if (typeof value === "object" && value !== null) {
            if (key === "weight" && typeof value === "object") {
              Object.keys(value).forEach((subKey) => {
                const subValue = value[subKey as keyof typeof value];
                filteredProperties.textValues.push({
                    title: `Weight ${convertToTitleCase(subKey)}`,
                    value: subValue,
                });
              });
            }
            return;
        }
        if (typeof value === "number") {
            filteredProperties.numberValues.push({ title: convertToTitleCase(key), value });
        } else {
            filteredProperties.textValues.push({ title: convertToTitleCase(key), value });
        }
    });
    return filteredProperties;
}

export function convertToTitleCase(input: string): string {
    return input.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase()) + ':';
}

export const getFormattedBreedValues = (breeds: CatBreedType[]) => {
    let formatedBreedValues = [];
    if (breeds.length > 0) {
        for (const item of breeds) {
            formatedBreedValues.push(getPropertiesByType(item));
        }
    }
    return formatedBreedValues;
}