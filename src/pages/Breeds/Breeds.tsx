import React, { useEffect, useState } from "react";
import styles from './Breeds.module.scss'
import ErrorToast from "../../components/ErrorToast/ErrorToast";
import { ProgressSpinner } from "primereact/progressspinner";
import { BreedType } from "../../services/apiTypes";
import { fetchBreedImages, fetchBreeds } from "../../services/apiService";
import CatCard from "../../components/CatCard/CatCard";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import { useNavigate } from "react-router-dom";
import { Dialog } from "primereact/dialog";

const Breeds: React.FC = () => {

    const navigate = useNavigate();

    const [breedByid, setBreedByid] = useState([]);

    // Breed Modal
    const [visibleBreedModal, setVisibleBreedModal] = useState<boolean>(false);
    
    const [breeds, setBreeds] = useState<BreedType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    // Error variables
    const [error, setError] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string>("");

    const loadBreeds = async () => {
            try {
                const response = await fetchBreeds();
                console.log(response)
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

    const loadCatDetailsById = async (id: string) => {
            try {
                const breedImages = await fetchBreedImages(id);
                // setBreedByid(breedImages);
                console.log(breedImages)
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

    const handleCardClick = (id: string) => {
        console.log(id)
        navigate(`/breeds/${id}`);
        loadCatDetailsById(id);
        setVisibleBreedModal(true);
    }

    return (
        <>
            {/* {catDetails &&
                <Dialog
                    header="Cat Details"
                    style={{width: '80vw'}}
                    breakpoints={{ '641px': '100vw' }}
                    blockScroll={true}
                    visible={visibleCatModal}
                    onHide={() => closeCatModal()}
                    draggable={false}>
                    <CatModal cat={catDetails}/>
                </Dialog>
            } */}
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
                                    <div className={`m-4 p-4 card ${styles.catCard}`} key={x.id} onClick={() => handleCardClick(x.id)}>
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