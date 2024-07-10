import { InterestQuizButtonSecondary, InterestQuizButtonToolTip, InterestQuizUnlockButton } from "./interest_quiz_button";
import Styles from "./ongoing_cards.module.scss";
const pauseImage = process.env.REACT_APP_AWS_BASE_URL + '/InterestBasedQuiz/pause_image.png';
const unlockImage = process.env.REACT_APP_AWS_BASE_URL + '/InterestBasedQuiz/unlock_image.png';

export const PauseCardWeb = ({ onResume, onClose }: { onResume: () => void, onClose: () => void }) => {
    return <div className={Styles.outer_card}>
        <div className={Styles.card}>
            <div className={Styles.header}>
                <img className={Styles.image} src={pauseImage} style={{
                    marginTop: "-100px"
                }} alt="Pause" />
                <div className={Styles.close} onClick={onResume}></div>
            </div>
            <div className={Styles.text}>Hey!, We are already halfway there and will reach soon.</div>
            <div className={Styles.button}><InterestQuizButtonToolTip onClick={onResume} title="Okay, Let me help" /></div>
            <div className={Styles.button}><InterestQuizButtonSecondary onClick={onClose} title="I will be back" /></div>
        </div>
    </div>;
};

export const PauseCardMobile = ({ onResume, onClose }: { onResume: () => void, onClose: () => void }) => {
    
    return <div className={Styles.outer_card_mobile}>
        <div className={Styles.card}>
            <div className={Styles.header}>
                <img className={Styles.image} src={pauseImage} alt="Pause" />
                <div className={Styles.close} onClick={onResume}></div>
            </div>
            <div className={Styles.text}>Hey!, We are already halfway there and will reach soon.</div>
            <div className={Styles.button}><InterestQuizButtonToolTip onClick={onResume} title="Okay, Let me help" /></div>
            <div className={Styles.button}><InterestQuizButtonSecondary onClick={onClose} title="I will be back" /></div>
        </div>
    </div>;
};

export const CopletedCardWeb = ({ onCompleted }: { onCompleted: () => void }) => {
    return <div className={Styles.outer_card}>
        <div className={Styles.card} style={{ padding: "37px 22px" }}>
            <img className={Styles.image_unlock} src={unlockImage} alt="Completed" />
            <div className={Styles.text}>You have helped olly reach the planet where magic happens</div>
            <div className={Styles.subtext}>Click below to unlock your reward</div>
            <div className={Styles.button}><InterestQuizUnlockButton onClick={onCompleted} title="Unlock Now!" /></div>
        </ div>
    </div>
};

export const CopletedCardMobile = ({ onCompleted }: { onCompleted: () => void }) => {
    return <div className={Styles.outer_card_mobile}>
        <div className={Styles.card} style={{ padding: "37px 22px" }}>
            <img className={Styles.image_unlock_mobile} src={unlockImage} alt="Completed" />
            <div className={Styles.text}>You have helped olly reach the planet where magic happens</div>
            <div className={Styles.subtext}>Click below to unlock your reward</div>
            <div className={Styles.button}><InterestQuizUnlockButton onClick={onCompleted} title="Unlock Now!" /></div>
        </ div>
    </div>
};