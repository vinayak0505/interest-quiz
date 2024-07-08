import { useState } from "react";
import Styles from "./card.module.scss";

export const FrontCard = ({ title }: { title: string }) => {
    return <div>
        frontend
    </div>
}

export const BackCard = ({ title, image }: { title: string, image: string }) => {
    return <div className={Styles.back_card}>
        <div className={Styles.inner_card}>
            <div className={Styles.image}>
                <img className={Styles.inner_image} src={image} alt={title} />
            </div>
            <div className={Styles.title}>{title}</div>
        </div>
    </div>
}

const FlipCard = ({ frontend, backend }: { frontend: JSX.Element, backend: JSX.Element }) => {
    const [flipped, setFlipped] = useState(true);

    const handleClick = () => {
        // setFlipped(!flipped);
    };

    return (
        <div className={`${Styles.flip_card} ${flipped ? Styles.flipped : ''}`} onClick={handleClick}>
            <div className={Styles.flip_card_inner}>
                {/* <div className={Styles.flip_card_front}>
                    {frontend}
                </div> */}
                <div className={Styles.flip_card_back}>
                    {backend}
                </div>
            </div>
        </div>
    );
};

export default FlipCard;