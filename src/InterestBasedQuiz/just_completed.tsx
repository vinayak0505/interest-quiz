import { useEffect, useState } from "react";
import Styles from "./just_completed.module.scss";
import PopupDropDown from "./popup_drop_down";
import { CopletedCardWeb } from "./ongoing_cards";

enum JustCompletedState {
    ANIMATE,
    UNLOCK,
    DONE
}
const JustCompleted = ({ onUnlock }: { onUnlock: () => void }) => {
    const [state, setState] = useState<JustCompletedState>(JustCompletedState.ANIMATE);

    useEffect(() => {
        if (state !== JustCompletedState.UNLOCK) return;
        const timer = setTimeout(() => {
            setState(JustCompletedState.DONE);
        }, 2000)

        return () => { clearTimeout(timer) }
    }, [state]);
    return (
        <div>
            <div className={Styles.container} style={{ opacity: state === JustCompletedState.ANIMATE ? 1 : 0 }}>
                <div className={Styles.backgrond}></div>
                <div className={Styles.front}>
                    <div className={Styles.skip} onClick={() => setState(JustCompletedState.DONE)}>Skip</div>
                    <div className={Styles.planet}></div>
                    <div className={Styles.rocket} onAnimationEnd={() => setState(JustCompletedState.UNLOCK)}></div>
                </div>
            </div>
            <div className={Styles.container_clear} style={{ opacity: state !== JustCompletedState.ANIMATE ? 1 : 0 }}>
                <div className={Styles.backgrond}></div>
                <div className={Styles.front}>
                    <div className={Styles.caption}>You’ve reached</div>
                    <div className={Styles.heading}>The planet where magic happens</div>
                    <div className={Styles.planet}></div>
                </div>
                {
                    state === JustCompletedState.DONE &&
                    <div className={Styles.interuptions}>
                        <PopupDropDown>
                            <CopletedCardWeb onCompleted={onUnlock} />
                        </PopupDropDown>
                    </div>
                }
            </div>
        </div>
    )
};

export default JustCompleted;