import React from "react";
import styles from './ValueWithBalls.module.scss'

interface ValueWithBallsProps {
    title: string;
    value: number | string;
}

const ValueWithBalls: React.FC<ValueWithBallsProps> = ({title, value}) => {

    const balls = Array.from({ length: 5 }, (_, index) => {
        const isActive = index < (typeof value === 'string' ? parseInt(value) : value);
        return (
            <div key={index} className={`${styles.ball} ${isActive ? styles.active : ''}`} />
        );
    });

    return (
        <div>
            <span className="text"><b>{title}</b></span>
            <div className={styles.ballContainer}>
                {balls}
            </div>
        </div>
    );
};

export default ValueWithBalls;