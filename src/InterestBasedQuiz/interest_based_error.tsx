import { useEffect, useState } from "react";
import Styles from "./interest_based_error.module.scss";
import InterestQuizButton from "./interest_quiz_button";
const errorImage = process.env.AWS_BASE_URL + '/InterestBasedQuiz/error_olly.png';

const heading = "Galactic disturbance detected. Unable to proceed.";
const subHeading = "We have experienced some unexpected error due to a breakdown. you can try to connect again.";
const buttonText = "Please reconnect";
const buttonLoadingText = "Reconnecting...";


const InterestBasedError = () => {

    // todo change
    const isLoading = false;

    const [isMobile, setIsMobile] = useState<boolean>(false);
    useEffect(() => {
        function updateSize() {
            setIsMobile(window.matchMedia("(max-width: 700px)").matches);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, [])


    return (
        <div className={Styles.background}>
            <div className={Styles.clouds}></div>
            <div className={Styles.star}></div>
            <div className={Styles.container}>
                <img className={Styles.image} src={errorImage} alt="Olly falling down" />
                <div className={Styles.heading}>{heading}</div>
                <div className={Styles.subheading}>{subHeading}</div>
                <div className={Styles.button}>
                    <InterestQuizButton title={isLoading ? buttonLoadingText : buttonText}
                        // left_div={
                        //     <img className={Styles.refresh} alt="refresh" />
                        // }
                    />
                </div>
            </div>
            <div className={Styles.ovals}>
                <div className={Styles.item} />
                {!isMobile && <div className={Styles.item} />}
            </div>
        </div>
    )
}

export default InterestBasedError;