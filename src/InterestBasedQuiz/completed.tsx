import { useEffect, useState } from "react";
import { RecommendedCarredData } from "../constants";
import FlipCard, { BackCard, FrontCard } from "./card";
import Styles from "./completed.module.scss";
import InterestQuizButton from "./interest_quiz_button";

const Completed = ({ onExplore }: { onExplore: () => void }) => {

    const cardData = RecommendedCarredData;
    
    const [isMobile, setIsMobile] = useState<boolean>(false);
    useEffect(() => {
        function updateSize() {
            setIsMobile(window.matchMedia("(max-width: 700px)").matches);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, [])

    return <div className={Styles.container}>
        <div className={Styles.ovals}>
            <div className={Styles.item} />
            {!isMobile && <div className={Styles.item} />}
        </div>
        <div className={Styles.content}>
            <div className={Styles.reward}>
                <div className={Styles.item}>Here’s your Reward</div>
            </div>
            <div className={Styles.title}>
                <div className={Styles.before}></div>
                <div> Here are the careers fields that fit your Interests</div>
                <div className={Styles.after}></div>
            </div>
            <div className={Styles.subtitle}>You can tap on any career fields to explore them</div>
            <div className={Styles.flex_half}></div>
            <div className={Styles.cards}>
                {
                    cardData.map((card, index) => {
                        return <FlipCard key={index} frontend={<FrontCard title={"Career field " + (index + 1)} />} backend={<BackCard title={card.title} image={card.image} />} />
                    })
                }
            </div>
            <div className={Styles.flex}></div>
            <div className={Styles.button}>
                <InterestQuizButton title="Explore more careers" onClick={onExplore} />
            </div>
            <div className={Styles.flex}></div>
        </div>
    </div>
};


export default Completed;
