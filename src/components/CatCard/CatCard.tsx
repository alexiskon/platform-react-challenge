import React from "react";
import { CatImageType } from "../../services/apiTypes";

interface CatDataProps {
    catData: CatImageType;
}

const CatCard: React.FC<CatDataProps> = ({catData}) => {

    return (
        <img
            src={catData.url}
            className="catImg"
            alt={catData.id}
            loading="eager"
        />
    );
};

export default CatCard;