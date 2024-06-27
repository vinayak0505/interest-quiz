import { InterestBasedQuizTempData } from "../constants";
import Styles from "./ongoing.module.scss";

import { useState } from "react";
import img from "../assets/InterestBasedQuiz/quiz1.png";
import InterestQuizButton from "./interest_quiz_button";
import PopupDropDown from "./popup_drop_down";
import { CopletedCardWeb, PauseCardWeb } from "./ongoing_cards";

enum STATE_ON_GOING {
    EXPLAIN,
    ONGOING,
    PAUSE,
    COMPLETED
}

const OnGoing = ({ onCompleted, onExit }: { onCompleted: () => void, onExit: () => void }) => {
    const [state, setState] = useState<STATE_ON_GOING>(STATE_ON_GOING.COMPLETED);
    const [percentage, setPercentage] = useState(0);
    const [questions, setQuestions] = useState(InterestBasedQuizTempData.questions)
    const [selected, setSelected] = useState(0);

    const onExplain = () => {
        setState(STATE_ON_GOING.EXPLAIN);
    }

    const onResume = () => {
        setState(STATE_ON_GOING.ONGOING);
    }

    const onSelected = (value: number) => {
        if (selected === questions.length - 1) {
            onCompleted();
        } else {
            setSelected(selected + 1);
            setPercentage(percentage + 20);
        }
    }

    const onNext = () => {
        if (selected <= questions.length - 1) {
            setSelected(selected + 1);
        }
    }

    const onPrev = () => {
        if (selected > 0) {
            setSelected(selected - 1);
        }
    }

    return <div className={Styles.container}>
        <Navigation onClose={() => setState(STATE_ON_GOING.PAUSE)} onNext={onNext} onPrev={onPrev} />
        <div className={Styles.background}>
            <Header completed={percentage} onExplain={onExplain} />
            <ProgressBar percentage={percentage} />
            <div className={Styles.translucent_card}>
                <img className={Styles.image} src={img} alt={questions[selected].questions} />
                <div className={Styles.question}>
                    {questions[selected].questions}
                </div>
                <div className={Styles.options_container}>
                    {
                        questions[selected].options.map((option) => (
                            <div className={Styles.button}>
                                <InterestQuizButton title={questions[selected].options[0].option} onClick={() => {
                                    onSelected(questions[selected].options[0].id);
                                }} />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
        {
            state !== STATE_ON_GOING.ONGOING && <Interuptions currentState={state} onClose={onExit} onResume={onResume} onCompleted={onCompleted} />
        }
    </div>;
};


const Header = ({ completed, onExplain }: { completed: number, onExplain: () => void }) => {
    return (
        <div className={Styles.header}>
            <div className={Styles.completed} >
                <div className={Styles.box}>
                    {completed}% completed
                </div>
            </div>
            <div className={Styles.explain} onClick={onExplain}>
            </div>
        </div >
    )
}

const ProgressBar = ({ percentage }: { percentage: number }) => {
    return <div className={Styles.progress_container}>
        <div className={Styles.left_icon} />
        <div className={Styles.progress}>

            <div className={Styles.line_container}>
                <div className={Styles.line} />
                <div className={Styles.line} />
                <div className={Styles.line} />
            </div>
            <div className={Styles.progress_bar_border}>
                <div className={Styles.progress_bar} />
            </div>
            <div className={Styles.progress_icon}></div>

        </div>
        <div className={Styles.right_icon} />
    </div>;
}

const Navigation = ({ onNext, onPrev, onClose }: { onNext: () => void, onPrev: () => void, onClose: () => void }) => {
    return <div className={Styles.navigation}>
        <div className={Styles.close} onClick={onClose} />
        <div className={Styles.change}>
            <div className={Styles.pre} onClick={onPrev} >
                <div className={Styles.icon} />
            </div>
            <div className={Styles.next} onClick={onNext} >
                <div className={Styles.icon} />
            </div>
        </div>
    </div>;
}

const Interuptions = ({ currentState, onResume, onClose, onCompleted }: { currentState: STATE_ON_GOING, onResume: () => void, onClose: () => void, onCompleted: () => void }) => {
    return <div className={Styles.interuptions}>
        <PopupDropDown>
            {/* <PauseCardWeb onClose={onClose} onResume={onResume}  /> */}
            <CopletedCardWeb onCompleted={onCompleted} />
        </PopupDropDown>
    </div>
}
export default OnGoing;