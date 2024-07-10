import { CSSProperties, useEffect, useState } from "react";
import Styles from "./start.module.scss";
import InterestQuizButton from "./interest_quiz_button";
import Lottie from 'react-lottie';
import PopupDropDown from "./popup_drop_down";
import { PauseCardMobile, PauseCardWeb } from "./ongoing_cards";
const LottieInit = process.env.REACT_APP_AWS_BASE_URL + '/InterestBasedQuiz/lottie_init.json';
const Lottie1 = process.env.REACT_APP_AWS_BASE_URL + '/InterestBasedQuiz/lottie_1.json';
const Lottie2 = process.env.REACT_APP_AWS_BASE_URL + '/InterestBasedQuiz/lottie_2.json';
const Lottie3 = process.env.REACT_APP_AWS_BASE_URL + '/InterestBasedQuiz/lottie_3.json';
const StartJourneyIcon = process.env.REACT_APP_AWS_BASE_URL + '/InterestBasedQuiz/start_journey_icon.png'

enum STATE_START {
    INIT = 'init',
    HEY = 'hey',
    FLOAT = 'float',
    LOST = 'lost',
    START = 'start',
    RESUME = 'resume',
}

interface customCSSProperties extends CSSProperties {
    '--start-color': string;
    '--end-color': string;
}

const Start = ({ resume, onComplete, onClose }: { resume: boolean, onComplete: () => void, onClose: () => void }) => {
    const [state, setState] = useState<STATE_START>(STATE_START.HEY);
    const [showClose, setShowClose] = useState(false);

    const onNext = () => {
        console.log("onNext", state, STATE_START.INIT);
        if (state === STATE_START.INIT) {
            setState(STATE_START.HEY);
        } else if (state === STATE_START.HEY) {
            setState(STATE_START.LOST);
        } else if (state === STATE_START.FLOAT) {
            setState(STATE_START.LOST);
        } else if (state === STATE_START.LOST) {
            setState(STATE_START.START);
        } else {
            console.log("else");
        }
    }

    const animationCompleted = () => {
        onNext();
    }

    // useEffect(() => {
    //     if (resume) {
    //         setState(STATE_START.RESUME);
    //     } else {
    //         setState(STATE_START.INIT);
    //     }
    // }, [resume]);


    const onSkip = () => {
        setState(STATE_START.START);
    }

    const getBackground = (): customCSSProperties => {
        if (state === STATE_START.START || state === STATE_START.RESUME)
            return {
                "--start-color": "#062C56",
                "--end-color": "#85E9FF",
            }
        if (state === STATE_START.FLOAT || state === STATE_START.LOST)
            return {
                "--start-color": "#3679B7",
                "--end-color": "#FFD0D0",
            }
        return {
            "--start-color": "#99CEFF",
            "--end-color": "#FFE0E0",
        }
    }

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
        <div className={Styles.background} style={getBackground()}>
            <div className={Styles.star}></div>
            <div className={Styles.container}>
                <CustomLottie state={state} animationCompleted={animationCompleted} />
                <div className={Styles.height}>
                    {
                        (state === STATE_START.START || state === STATE_START.RESUME) ?
                            (
                                isMobile ?
                                    <>
                                        <div className={Styles.finaltext}>Help yourself by helping Olly reach the</div>
                                        <div className={Styles.finaltextgradient2 + " " + Styles.finaltext}>planet where magic happens to discover</div>
                                        <div className={Styles.finaltextgradient3 + " " + Styles.finaltext}>careers based on your interests</div>
                                    </> :
                                    <>
                                        <div className={Styles.finaltext}>Help yourself by helping Olly reach the planet where magic</div>
                                        <div className={Styles.finaltextgradient + " " + Styles.finaltext}>happens to discover careers based on your interests</div>
                                    </>
                            )
                            :
                            <>
                                <div className={Styles.lostHeading + " " + (state === STATE_START.LOST ? Styles.visible : "")}>Olly is lost and confused!</div>
                                <div className={Styles.lostSub + " " + (state === STATE_START.LOST ? Styles.visible : "")}>Sometimes you might also feel the same while choosing the right career for yourself.</div>
                            </>
                    }
                    {
                        (state === STATE_START.START || state === STATE_START.RESUME) &&
                        <div className={Styles.button}>
                            <InterestQuizButton title="Start the Journey" image={StartJourneyIcon} onClick={onComplete} />
                        </div>
                    }
                </div>
            </div>
            <div className={Styles.ovals}>
                <div className={Styles.item} />
                {!isMobile && <div className={Styles.item} />}
            </div>
            {(state !== STATE_START.START && state !== STATE_START.RESUME) ?
                <div className={Styles.skip} key={"skip"} onClick={onSkip}>Skip</div>
                : <div className={Styles.close} key={"close"} onClick={() => setShowClose(true)} ></div>
            }
            {
                showClose && <div className={Styles.interuptions}>
                    <PopupDropDown
                        webChildren={
                            <PauseCardWeb onClose={onClose} onResume={() => setShowClose(false)} />
                        }
                        mobileChildren={
                            <PauseCardMobile onClose={onClose} onResume={() => setShowClose(false)} />
                        }
                    />
                </div>
            }
        </div>
    );
};


const CustomLottie = ({ state, animationCompleted }: { state: STATE_START, animationCompleted: () => void }) => {

    const dontShow = (state === STATE_START.INIT || state === STATE_START.HEY);
    return <div className={Styles.lottie + " " + (dontShow ? "" : Styles.move_lottie)}>{
        // change lottie to image
        (state === STATE_START.START || state === STATE_START.RESUME) ?
            <Lottie
                key={"state"}
                options={{
                    loop: false,
                    autoplay: true,
                    animationData: Lottie3,
                }}
                height={400}
                width={400}
            />
            : (state === STATE_START.LOST) ? <Lottie
                key={"lost"}
                eventListeners={[{ eventName: "complete", callback: animationCompleted }]}
                options={{
                    loop: false,
                    autoplay: true,
                    animationData: Lottie2,
                }}
                height={400}
                width={400}
            />
                : (state === STATE_START.FLOAT) ? <Lottie
                    key={"float"}
                    eventListeners={[{ eventName: "complete", callback: animationCompleted }]}
                    options={{
                        loop: false,
                        autoplay: true,
                        animationData: Lottie2,
                    }}
                    height={400}
                    width={400}
                />
                    : (state === STATE_START.HEY) ? <Lottie
                        key={"hey"}
                        eventListeners={[{ eventName: "complete", callback: animationCompleted }]}
                        options={{
                            loop: false,
                            autoplay: true,
                            animationData: Lottie1,
                        }}
                        height={400}
                        width={400}
                    />
                        // final init state
                        : <Lottie
                            key={"init"}
                            eventListeners={[{ eventName: "complete", callback: animationCompleted }]}
                            options={{
                                loop: false,
                                autoplay: true,
                                animationData: LottieInit,
                            }}
                            height={400}
                            width={400}
                        />
    }</div>
}
export default Start;