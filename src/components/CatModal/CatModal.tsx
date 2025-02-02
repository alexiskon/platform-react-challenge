import React, { useEffect, useState } from "react";
import styles from './CatModal.module.scss'
import { CatImageByIdType } from "../../services/apiTypes";
import { getFormattedBreedValues } from "../../pages/Home/Home.util";
import { Carousel } from 'primereact/carousel';
import ValueWithBalls from "../ValueWithBalls/ValueWithBalls";
import { useFavorites } from "../../contexts/FavouritesContext";

interface CatModalProps {
    cat: CatImageByIdType;
}

const CatModal: React.FC<CatModalProps> = ({cat}) => {

    const { favorites, addFavorite, removeFavorite, isFavourite } = useFavorites();
    const formatedBreedValues = cat.breeds ? getFormattedBreedValues(cat.breeds) : [];

    const [favouriteVar, setFavouriteVar] = useState<boolean>(isFavourite(cat.id));

    useEffect(() => {
        setFavouriteVar(isFavourite((cat.id)));
    }, [favorites])

    const carouselTemplate = () => {
        return (
            <div className={`${styles.carouselContainer} p-4 card`}>
                {formatedBreedValues.map((x, index) => {
                    return(
                        <div key={index} className={styles.carouselTemplate}>
                            <div className={styles.carouselTemplate__textValues}>
                                {x.textValues.map(y => {
                                    return (
                                        <div key={y.title}>
                                            <span className="text">
                                                <b>{y.title}</b> {y.value}
                                            </span>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className={styles.carouselTemplate__numberValues}>
                                {x.numberValues.map(w => {
                                    return (
                                        <ValueWithBalls key={w.title} title={w.title} value={w.value} />
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }

    const handleFavourite = () => {
        if (isFavourite(cat.id)) {
            removeFavorite(cat.id);
        } else {
            addFavorite(cat.id);
        }
        setFavouriteVar(prevVal => !prevVal);
    }

    return (
        <>
            <div className={`${styles.detailsContainer} mainFlex mt-4`}>
                <div className={`${styles.detailsContainer__favourite}`}>
                    <i
                        onClick={() => handleFavourite()}
                        className={`pi pi-star ${favouriteVar ? 'isfavouriteIcon' : styles.isNotfavouriteIcon}`}
                    >
                    </i>
                </div>
                <div className={`${styles.detailsContainer__img} m-4`}>
                    <img
                        src={cat.url}
                        className="catImg"
                        alt={cat.id}
                        loading="eager"
                    />
                </div>
            </div>
            <div className={`mainFlex`}>
                {formatedBreedValues.length > 0 ?
                    <div>
                        <Carousel value={formatedBreedValues} itemTemplate={carouselTemplate} numVisible={1} numScroll={1}/>
                    </div>
                    :
                    <div className="mainFlex w-100" style={{justifyContent: 'center'}}>
                        <b className="text">Breed details not found.</b>
                    </div>
                }
            </div>
        </>
    );
};

export default CatModal;