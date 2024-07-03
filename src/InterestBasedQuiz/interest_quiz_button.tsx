import Styles from "./interest_quiz_button.module.scss";

const InterestQuizButton = ({ title, image, onClick }: { title?: string, image?: string, onClick?: () => void }) => {
    return <div className={Styles.border+ " " + Styles.shadow} onClick={onClick}>
        <div className={Styles.interest_quiz_button}>
            {image && <img className={Styles.image} src={image} alt={title} />}
            {title}
        </div>
    </div>
};

export const InterestQuizButtonToolTip = ({ title, image, onClick }: { title?: string, image?: string, onClick?: () => void }) => {
    return <div className={Styles.border} onClick={onClick}>
        <div className={Styles.interest_quiz_button}>
            {image && <img className={Styles.image} src={image} alt={title} />}
            {title}
        </div>
    </div>
};

export const InterestQuizUnlockButton = ({ title, onClick }: { title?: string, onClick?: () => void }) => {
    return <div className={Styles.unlock_border} onClick={onClick}>
        <div className={Styles.interest_quiz_button}>
             <div className={Styles.lock} />
            {title}
        </div>
    </div>
};

export const InterestQuizButtonSecondary = ({ title, image, onClick }: { title?: string, image?: string, onClick?: () => void }) => {
    return <div className={Styles.secondary} onClick={onClick}>
        {image && <img className={Styles.image} src={image} alt={title} />}
        {title}
    </div>
};

export default InterestQuizButton;