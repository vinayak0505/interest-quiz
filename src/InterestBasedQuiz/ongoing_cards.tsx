import InterestQuizButton, { InterestQuizButtonSecondary } from "./interest_quiz_button";
import Styles from "./ongoing_cards.module.scss";
import pauseImage from "./../assets/InterestBasedQuiz/pause_image.png"
import lockIcon from "./../assets/InterestBasedQuiz/lock_icon.png"

export const PauseCardWeb = ({ onResume, onClose }: { onResume: () => void, onClose: () => void }) => {
    return <div className={Styles.card}>
        <div className={Styles.header}>
            <img className={Styles.image} src={pauseImage} style={{
                marginTop: "-100px"
            }} alt="Pause" />
            <div className={Styles.close} onClick={onResume}></div>
        </div>
        <div className={Styles.text}>Hey!, We are already halfway there and will reach soon.</div>
        <div className={Styles.button}><InterestQuizButton onClick={onResume} title="Okay, Let me help" /></div>
        <div className={Styles.button}><InterestQuizButtonSecondary onClick={onClose} title="I will be back" /></div>
    </div>;
};

export const CopletedCardWeb = ({ onCompleted }: { onCompleted: () => void }) => {
    return < div className={Styles.card} style={{ padding: "37px 0px" }}>
        <div className={Styles.header}>
            <img className={Styles.image} src={pauseImage} alt="Completed" />
        </div>
        <div className={Styles.text}>You have helped olly reach the planet where magic happens</div>
        <div className={Styles.subtext}>Click below to unlock your reward</div>
        <div className={Styles.button}><InterestQuizButton onClick={onCompleted} title="Unlock Now!" image={lockIcon} /></div>
    </ div>;
};