import { CSSProperties, useEffect, useState } from "react";
import Styles from "./start.module.scss";
import InterestQuizButton from "./interest_quiz_button";

enum STATE_START {
    INIT = 'init',
    START = 'start',
    RESUME = 'resume',
}

interface customCSSProperties extends CSSProperties {
    '--start-color': string;
    '--end-color': string;
}

const Start = ({ resume, onComplete }: { resume: boolean, onComplete: () => void }) => {
    const [state, setState] = useState<STATE_START>(STATE_START.INIT);

    const onNext = () => {
        console.log("onNext", state, STATE_START.INIT);
        if (state === STATE_START.INIT) {
            setState(STATE_START.START);
        } else {
            console.log("else");
        }
    }

    useEffect(() => {
        if (resume) {
            setState(STATE_START.RESUME);
        } else {
            setState(STATE_START.INIT);
        }
    }, [resume]);

    useEffect(() => {
        const data = setInterval(() => {
            if (state === STATE_START.START) {
                clearInterval(data);
                return;
            }
            console.log(state);
            onNext();
        }, 2000)
        return () => {
            clearInterval(data);
        }
    }, [state]);


    const onSkip = () => {
        setState(STATE_START.START);
    }

    // const getBackground = (): customCSSProperties => {
    //     if (state === STATE_START.START || state === STATE_START.RESUME)
    //         return {
    //             "--start-color": "#062C56",
    //             "--end-color": "#85E9FF",
    //         }
    //     if (state === STATE_START.LOST || state === STATE_START.FLOAT)
    //         return {
    //             "--start-color": "#3679B7",
    //             "--end-color": "#FFD0D0",
    //         }
    //     return {
    //         "--start-color": "#99CEFF",
    //         "--end-color": "#FFE0E0",
    //     }
    // }

    return (
        <div className={Styles.background}>
            <div className={Styles.star}></div>
            <div className={Styles.container}>
                <div className={Styles.button}>
                        <InterestQuizButton title="Okay, Let me help" />
                </div>
            </div>
        </div>
    );
};
export default Start;