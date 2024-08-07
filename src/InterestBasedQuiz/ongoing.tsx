import { InterestBasedQuizTempData } from "../constants";
import Styles from "./ongoing.module.scss";

import { CSSProperties, useEffect, useRef, useState } from "react";
import img from "../assets/InterestBasedQuiz/quiz1.png";
import InterestQuizButton from "./interest_quiz_button";
import PopupDropDown from "./popup_drop_down";
import { PauseCardWeb } from "./ongoing_cards";
import { ToolTipForQuiz } from "./custom_tooltip";
import ToolTip0 from './../assets/InterestBasedQuiz/tooltip_0.png';
import ToolTip1 from './../assets/InterestBasedQuiz/tooltip_1.png';
import ToolTip2 from './../assets/InterestBasedQuiz/tooltip_2.png';
import ToolTip3 from './../assets/InterestBasedQuiz/tooltip_3.png';

enum STATE_ON_GOING {
    EXPLAIN,
    ONGOING,
    PAUSE,
}

interface customProgressStyle extends CSSProperties {
    '--completed': String;
}

const OnGoing = ({ onCompleted, onExit }: { onCompleted: () => void, onExit: () => void }) => {
    const [state, setState] = useState<STATE_ON_GOING>(STATE_ON_GOING.EXPLAIN);
    const [percentage, setPercentage] = useState(0.0);
    const [questions, setQuestions] = useState(InterestBasedQuizTempData.questions)
    const [selected, setSelected] = useState(0);
    const [explainItem, setExplainItem] = useState(0);

    const onExplain = () => {
        setExplainItem(0);
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
            setPercentage(percentage + (100 / (questions.length)));
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

    const child =
        <Child {...{ percentage, onClose: () => setState(STATE_ON_GOING.ONGOING), questions, selected, onNext: () => setExplainItem(explainItem + 1), explainItem }} />
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
            state !== STATE_ON_GOING.ONGOING && <Interuptions child={child} currentState={state} onClose={onExit} onResume={onResume} onCompleted={onCompleted} />
        }
    </div>
};


const Header = ({ completed, onExplain }: { completed: number, onExplain: () => void }) => {

    return (
        <div className={Styles.header}>
            <div className={Styles.completed}>
                {/* <div className={Styles.box}> */}
                {completed}% completed
                {/* </div> */}
            </div>
            <div className={Styles.explain} onClick={onExplain}>
            </div>
        </div >
    )
}

const ProgressBar = ({ percentage }: { percentage: number }) => {
    const style: customProgressStyle = { '--completed': `${percentage}%` };

    return <div className={Styles.progress_container}>
        <div className={Styles.left_icon} />
        <div className={Styles.progress} style={style}>

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
    </div>
}

const Navigation = ({ onNext, onPrev, onClose }: { onNext: () => void, onPrev: () => void, onClose: () => void }) => {
    return <div className={Styles.navigation}>
        <div className={Styles.close} onClick={onClose} >
        </div>
        <div className={Styles.change}>
            <div className={Styles.pre} onClick={onPrev} >
                <div className={Styles.icon} />
            </div>
            <div className={Styles.next} onClick={onNext} >
                <div className={Styles.icon} />
            </div>
        </div>
    </div>
}

const Interuptions = ({ currentState, onResume, onClose, child }: { currentState: STATE_ON_GOING, onResume: () => void, onClose: () => void, onCompleted: () => void, child: JSX.Element }) => {
    return <div className={Styles.interuptions}>
        {
            currentState === STATE_ON_GOING.PAUSE ?
                <PopupDropDown>
                    <PauseCardWeb onClose={onClose} onResume={onResume} />
                </PopupDropDown>
                : child
        }

    </div>
}

const Child = ({ percentage, onClose, questions, selected, onNext, explainItem }:
    { percentage: number, onClose: () => void, questions: typeof InterestBasedQuizTempData.questions, selected: number, onNext: () => void, explainItem?: number }) => {

    const showNav = explainItem === 1;
    const showText = explainItem === 0;
    const showImage = explainItem === 0 || explainItem === 2;
    const showExplain = explainItem === 3;
    const [top, setTop] = useState(0);
    const [left, setLeft] = useState(0);
    const [image, setImage] = useState(ToolTip0);
    const textRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const explainRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        var ref;
        var width = 0;
        switch (explainItem) {
            case 0:
                ref = textRef;
                width = 300;
                setImage(ToolTip0);
                break;
            case 1:
                ref = progressRef;
                width = 200;
                setImage(ToolTip1);
                break;
            case 2:
                ref = imageRef;
                width = 200;
                setImage(ToolTip2);
                break;
            case 3:
                ref = explainRef;
                width = 200;
                setImage(ToolTip3);
                break;
        }
        if (ref?.current == null) return;
        const refheight = ref.current.getBoundingClientRect().height + ref.current.getBoundingClientRect().y + 20;
        const refCenter = ref.current.getBoundingClientRect().x + ref.current.getBoundingClientRect().width / 2 - width;
        setTop(refheight);
        setLeft(refCenter);
    }, [explainItem, textRef])

    const style: customProgressStyle = { '--completed': `${percentage}%`, visibility: showNav ? 'visible' : 'hidden' };

    return <div className={Styles.background} >
        <div
            className={Styles.tooltip}
            style={{
                top: top + 'px',
                width: explainItem === 0 ? '600px' : '400px',
                left: left + 'px',
            }}>

            <ToolTipForQuiz image={image} onNext={onNext} onClose={onClose} showFinishButton={explainItem === 3} />
        </div>
        <div className={Styles.header}>
            <div className={Styles.completed} style={{ visibility: 'hidden' }}>
                {percentage}% completed
            </div>
            <div className={Styles.explain} ref={explainRef} style={{ visibility: showExplain ? 'visible' : 'hidden' }}>
            </div>
        </div >
        <div className={Styles.progress_container} >
            <div className={Styles.left_icon} style={{ visibility: 'hidden' }} />
            <div className={Styles.progress} style={style}>

                <div className={Styles.line_container} >
                    <div className={Styles.line} />
                    <div className={Styles.line} />
                    <div className={Styles.line} />
                </div>
                <div className={Styles.progress_bar_border} ref={progressRef} style={{ visibility: showNav ? 'visible' : 'hidden' }}>
                    <div className={Styles.progress_bar} />
                </div>
                <div className={Styles.progress_icon}></div>

            </div>
            <div className={Styles.right_icon} style={{ visibility: 'hidden' }} />
        </div>
        <div className={Styles.translucent_card +" "+Styles.invisible_translucent_card} style={{ background: 'transparent' }}>
            <img className={Styles.image} ref={imageRef} src={img} alt={questions[selected].questions} style={{ visibility: showImage ? 'visible' : 'hidden' }} />
            <div className={Styles.question} ref={textRef} style={{ visibility: showText ? 'visible' : 'hidden' }}>
                {questions[selected].questions}
            </div>
            <div className={Styles.options_container} style={{ visibility: 'hidden' }}>
                {
                    questions[selected].options.map((option) => (
                        <div className={Styles.button}>
                            <InterestQuizButton title={questions[selected].options[0].option} onClick={() => {
                            }} />
                        </div>
                    ))
                }
            </div>
        </div>
    </div>
}

export default OnGoing;