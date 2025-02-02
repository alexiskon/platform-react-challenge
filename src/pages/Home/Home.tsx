import React, { useEffect, useState } from "react";
import styles from './Home.module.scss'
import { fetchCatDetailsById, fetchCatImages } from "../../services/apiService";
import { CatImageType, CatImageByIdType } from "../../services/apiTypes";
import CatCard from "../../components/CatCard/CatCard";
import { ProgressSpinner } from 'primereact/progressspinner';
import ErrorToast from "../../components/ErrorToast/ErrorToast";
import { Button } from 'primereact/button';
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import { useNavigate, useParams } from "react-router-dom";
import CatModal from "../../components/CatModal/CatModal";
import { Dialog } from 'primereact/dialog';

const Home: React.FC = () => {

    const navigate = useNavigate();
    const { id } = useParams<{ id?: string }>();

    const [catImages, setCatImages] = useState<CatImageType[]>([]);
    const [catDetails, setCatDetails] = useState<CatImageByIdType | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    // Cat Modal
    const [visibleCatModal, setVisibleCatModal] = useState<boolean>(false);

    // Error variables
    const [error, setError] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string>("");

    useEffect(() => {
        loadCatImages();
        if (id) {
            loadCatDetailsById(id);
            setVisibleCatModal(true);
        }
    }, []);

    const loadCatImages = async () => {
        try {
            const images = await fetchCatImages();
            setCatImages(prevVal => {
                let newVal =[...prevVal];
                images.forEach(x => newVal.push(x));
                return newVal;
            });
            setLoading(false);
        } catch (err: any) {
            console.log(err);
            handleErrors();
        }
    };

    const loadCatDetailsById = async (id: string) => {
        try {
            const details = await fetchCatDetailsById(id);
            setCatDetails(details);
            setCatImages(prevVal => {
                if (!prevVal.some(cat => cat.id === details.id)) {
                    return [...prevVal, details];
                }
                return prevVal;
            });
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

    const handleImgClick = (element: CatImageType) => {
        navigate(`/${element.id}`);
        setVisibleCatModal(true);
        loadCatDetailsById(element.id);
    }

    const closeCatModal = () => {
        setCatDetails(null);
        const newUrl = location.pathname.split("/")[1] ? "/" : location.pathname;
        window.history.replaceState(null, "", newUrl);
        setVisibleCatModal(false);
    }

    return (
        <>
            {catDetails &&
                <Dialog
                    header="Cat Details"
                    style={{width: '80vw'}}
                    breakpoints={{ '641px': '90vw' }}
                    blockScroll={true}
                    visible={visibleCatModal}
                    onHide={() => closeCatModal()}
                    draggable={false}>
                    <CatModal cat={catDetails}/>
                </Dialog>
            }
            <ScrollToTop />
            {error && <ErrorToast message={errorMsg}/>}
            {(!loading) ? 
                <div className={`pageLayout mainFlex mb-4`}>
                    <div className='mb-4 mainFlex flex-column'>
                        <span className="title mb-2">Cat Images</span>
                        <span className="subtitle">Tap on an image to view the cat's details.</span>
                    </div>
                    <div className={`${styles.home__imagesArea} mainFlex`}>
                        {catImages.map(x => {
                            return (
                                <div key={x.id} className={styles.imageContainer} onClick={() => handleImgClick(x)}>
                                    <CatCard catData={x}/>
                                </div>
                            )
                        })}
                    </div>
                    <div className={`${styles.home__loadMoreBtn} mt-4`}>
                            <Button label="Load More Cats" raised icon="pi pi-users" onClick={() => loadCatImages()}/>   
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

export default Home;