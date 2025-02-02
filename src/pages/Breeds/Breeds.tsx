import React, { useEffect, useState } from "react";
import styles from './Breeds.module.scss'
import ErrorToast from "../../components/ErrorToast/ErrorToast";
import { ProgressSpinner } from "primereact/progressspinner";
import { BreedType, CatImageByIdType } from "../../services/apiTypes";
import { fetchBreedImages, fetchBreeds } from "../../services/apiService";
import CatCard from "../../components/CatCard/CatCard";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import { Dialog } from "primereact/dialog";
import CatModal from "../../components/CatModal/CatModal";

const Breeds: React.FC = () => {

    const [breeds, setBreeds] = useState<BreedType[]>([]);

    // Breed Modal
    const [breedByid, setBreedByid] = useState<CatImageByIdType[]>([]);
    const [visibleBreedModal, setVisibleBreedModal] = useState<boolean>(false);

    // Cat Modal
    const [catImgById, setCatImgById] = useState<CatImageByIdType | null>(null);
    const [visibleCatModal, setVisibleCatModal] = useState<boolean>(false);
    
    const [loading, setLoading] = useState<boolean>(true);

    // Error variables
    const [error, setError] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string>("");

    const loadBreeds = async () => {
        try {
            const response = await fetchBreeds();
            setBreeds(response);
            setLoading(false);
        } catch (err: any) {
            console.log(err);
            handleErrors();
        }
    };

    useEffect(() => {
        loadBreeds();
    }, [])

    const loadBreedsById = async (id: string) => {
        try {
            const breedImages = await fetchBreedImages(id);
            setBreedByid(breedImages);
        } catch (err: any) {
            console.log(err);
            handleErrors();
        }
    };

    const handleErrors = () => {
        setErrorMsg("Something went wrong, please try again.");
        setError(true);
        setLoading(false);
    }

    const handleBreedCardClick = (id: string) => {
        loadBreedsById(id);
        setVisibleBreedModal(true);
    }

    const handleBreedImgClick = (x: CatImageByIdType) => {
        setVisibleCatModal(true);
        setCatImgById(x);
    }

    return (
        <>
            {(visibleCatModal && catImgById) &&
                <Dialog
                header="Breed Images"
                style={{width: '80vw'}}
                breakpoints={{ '641px': '100vw' }}
                blockScroll={true}
                visible={visibleBreedModal}
                onHide={() => {
                    setVisibleCatModal(false);
                    setCatImgById(null);
                }}
                draggable={false}>
                    <CatModal cat={catImgById}/>
                </Dialog>
            }
            <Dialog
                header="Breed Images"
                style={{width: '80vw'}}
                breakpoints={{ '641px': '100vw' }}
                blockScroll={true}
                visible={visibleBreedModal}
                onHide={() => {
                    setVisibleBreedModal(false);
                    setBreedByid([]);
                }}
                draggable={false}>
                <div className={`pageLayout mainFlex mb-4`}>
                    <div className='mb-4 mainFlex flex-column'>
                        <span className="title mb-2">Cat Images</span>
                        <span className="subtitle">Tap on a breed to explore more cat images of this breed.</span>
                    </div>
                    <div className={`${styles.breedDialog} mainFlex`}>
                        {breedByid.map(x => {
                            return (
                                <div key={x.id} className={styles.breedDialog__img} onClick={() => handleBreedImgClick(x)}>
                                    <CatCard
                                        catData={{
                                            id: x.id,
                                            url: x.url,
                                            width: x.width,
                                            height: x.height,
                                        }}
                                    />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </Dialog>
            <ScrollToTop />
            {error && <ErrorToast message={errorMsg}/>}
            {!loading ?
                <div className={`pageLayout mainFlex mb-4`}>
                    <div className='mb-4 mainFlex flex-column'>
                        <span className="title mb-2">Cat Breeds</span>
                        <span className="subtitle">Tap on an breed to view the breed's details.</span>
                    </div>
                    <div className={`${styles.breedContainer} mainFlex`}>
                       {breeds.map(x => {
                            if (x.image) {
                                return (
                                    <div className={`m-4 p-4 card ${styles.catCard}`} key={x.id} onClick={() => handleBreedCardClick(x.id)}>
                                        <div className={styles.catCard__img}>
                                            <CatCard catData={x.image}/>
                                        </div>
                                        <div className={`${styles.catCard__desc}`}>
                                            <span className="title" style={{textAlign: "start"}}>{x.name}</span>
                                            <span className="text" style={{textAlign: "start"}}>{x.description}</span>
                                            <a href={x.wikipedia_url}>{x.wikipedia_url}</a>
                                        </div>
                                    </div>
                                )
                            } else {
                                return <></>
                            }
                        })}
                    </div>
                </div>
            :
                <div className="mainFlex h-100 mt-4">
                    <ProgressSpinner style={{width: '150px', height: '200px'}} strokeWidth="4" fill="var(--surface-ground)" animationDuration=".5s" />
                </div>
            }
        </>
    );
};

export default Breeds;