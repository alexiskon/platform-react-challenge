import React from "react";
import styles from './Favourites.module.scss'
import { useFavorites } from "../../contexts/FavouritesContext";
import CatCard from "../../components/CatCard/CatCard";

const Favourites: React.FC = () => {
    
    const { favorites, removeFavorite } = useFavorites();

    return (
        <>
            <div className={`pageLayout mainFlex mb-4`}>
                <div className='mb-4 mainFlex flex-column'>
                    <span className="title mb-2">Your Favourite Cat Images</span>
                    <span className="subtitle">Click the star icon to remove an image from your favorites.</span>
                </div>
                <div className={`${styles.favourites} mainFlex`}>
                    {favorites.map(x => {
                        if (x.value === 1) {
                            const catCardData = {
                                id: x.image.id,
                                url: x.image.url,
                                width: 250,
                                height: 250
                            }
                            return (
                                <div key={x.image_id} className={styles.imageContainer}>
                                    <div className={`${styles.imageContainer__favourite}`}>
                                        <i
                                            onClick={() => removeFavorite(x.image_id)}
                                            className={`pi pi-star isfavouriteIcon`}
                                        >
                                        </i>
                                    </div>
                                    <CatCard catData={catCardData}/>
                                </div>
                            )
                        }
                        return <></>;
                    })}
                </div>
            </div>
        </>
    );
};

export default Favourites;