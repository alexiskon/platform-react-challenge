import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { FavouritesType } from "../services/apiTypes";
import { fetchFavourites, postFavourite, removeFavourite } from "../services/apiService";

interface FavoritesContextType {
    favorites: FavouritesType[];
    loadFavorites: () => void;
    addFavorite: (imageId: number | string) => void;
    removeFavorite: (imageId: number | string) => void;
    isFavourite: (imageId: number | string) => boolean;
};

const FavoritesContext = createContext<FavoritesContextType | null>(null);

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [favorites, setFavorites] = useState<FavouritesType[]>([]);
  
    const loadFavorites = async () => {
        try {
            const response = await fetchFavourites();
            setFavorites(response);
        } catch (error) {
            console.error("Error fetching favorites:", error);
        }
    };
  
    const addFavorite = async (imageId: number | string) => {
        try {
            await postFavourite(imageId);
            loadFavorites();
        } catch (error) {
            console.error("Error adding favorite:", error);
        }
    };
  
    const removeFavorite = async (imageId: number | string) => {
        try {
            await removeFavourite(imageId);
            loadFavorites();
        } catch (error) {
            console.error("Error removing favorite:", error);
        }
    };

    const isFavourite = (imageId: number | string): boolean => {
        if (favorites) {
            const fav = favorites.find(x => x.image_id === imageId);
            return fav ? fav.value === 1 : false;
        }
        return false;
    };
  
    // Fetch favorites when the component mounts
    useEffect(() => {
        loadFavorites();
    }, []);
  
    return (
      <FavoritesContext.Provider value={{ favorites, loadFavorites, addFavorite, removeFavorite, isFavourite }}>
        {children}
      </FavoritesContext.Provider>
    );
  };
  
export const useFavorites = (): FavoritesContextType  => {
    const context = useContext(FavoritesContext);
    if (!context) {
      throw new Error("useFavorites must be used within a FavoritesProvider");
    }
    return context;
};