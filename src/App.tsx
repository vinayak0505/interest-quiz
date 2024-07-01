import Completed from "./InterestBasedQuiz/completed";
import JustCompleted from "./InterestBasedQuiz/just_completed";
import OnGoing from "./InterestBasedQuiz/ongoing";
import Start from "./InterestBasedQuiz/start";
import React, { useEffect, useState } from "react";
import { InterestBasedQuizTempData } from "./constants";

enum STATE {
    START,
    RESUME,
    ONGOING,
    JUSTCOMPLETED,
    COMPLETED
}

const App = () => {
    // const [state, setState] = useState<STATE>(STATE.START);
    const [state, setState] = useState<STATE>(STATE.JUSTCOMPLETED);

    // useEffect(() => {
    //     const data = InterestBasedQuizTempData;
    //     if (data.state === 'Completed') {
    //         setState(STATE.COMPLETED);
    //     } else if (data.state === 'Resume') {
    //         setState(STATE.RESUME);
    //     } else {
    //         setState(STATE.START);
    //     }
    // },[])

    const onExit = () => {
        // TODO complete on navigate onexit
    }

    const onExplore = () => {

    }

    const onNext = () => {
        switch (state) {
            case STATE.START:
            case STATE.RESUME:
                setState(STATE.ONGOING);
                break;
            case STATE.ONGOING:
                setState(STATE.JUSTCOMPLETED);
                break;
            case STATE.JUSTCOMPLETED:
                setState(STATE.COMPLETED);
                break;
            default:
                console.log("Invalid state");
        }
    }

    if (state === STATE.ONGOING) {
        return <OnGoing onCompleted={onNext} onExit={onExit} />
    }
    if (state === STATE.JUSTCOMPLETED) {
        return <JustCompleted onNext={onNext} />
    }
    if (state === STATE.COMPLETED) {
        return <Completed onExplore={onExplore}/>
    }
    return <Start resume={state === STATE.RESUME} onComplete={onNext} />;
}

export default App;