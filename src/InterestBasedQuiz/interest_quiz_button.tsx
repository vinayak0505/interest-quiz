import Styles from "./interest_quiz_button.module.scss";

const InterestQuizButton = ({ title, image, onClick }: { title?: string, image?: string, onClick?: () => void }) => {
    return <div className={Styles.border} onClick={onClick}>
        <div className={Styles.interest_quiz_button}>
            {image && <img src={image} alt={title} />}
            {title}
        </div>
    </div>
};

export default InterestQuizButton;