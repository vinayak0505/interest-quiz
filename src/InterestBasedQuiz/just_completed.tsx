import { useEffect, useState } from "react";
import Styles from "./just_completed.module.scss";
import PopupDropDown from "./popup_drop_down";
import { CopletedCardMobile, CopletedCardWeb, PauseCardWeb } from "./ongoing_cards";
import rocket_mobile from '../assets/InterestBasedQuiz/rocket_mobile.png';
import rocket from './../assets/InterestBasedQuiz/rocket.png';

enum JustCompletedState {
    ANIMATE = 'animate',
    UNLOCK = 'unlock',
    DONE = 'done'
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

    const onAnimationEnd = () => {
        if(state !== JustCompletedState.ANIMATE) return;
        setState(JustCompletedState.UNLOCK);
    }

    const [animate, setAnimate] = useState(false);
    const onLoad = () =>{
        
        setAnimate(true);
    }

    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        function updateSize() {
            setIsMobile(window.matchMedia("(max-width: 700px)").matches);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, [])

    return (
        <div>
            <div className={Styles.container} style={{ opacity: state === JustCompletedState.ANIMATE ? 1 : 0 }}>
                <div className={Styles.backgrond}></div>
                <div className={Styles.front}>
                    <div className={Styles.skip} onClick={() => setState(JustCompletedState.DONE)}>Skip</div>
                    <div className={Styles.planet}></div>
                    <img className={Styles.rocket + " " + (animate ? Styles.start_animate : "")} src={isMobile ? rocket_mobile : rocket} onLoad={onLoad} onAnimationEnd={onAnimationEnd} alt="rocket"></img>
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
                        <PopupDropDown 
                            webChildren={<CopletedCardWeb onCompleted={onUnlock} />}
                            mobileChildren={<CopletedCardMobile onCompleted={onUnlock} />}
                        />
                    </div>
                }
            </div>
        </div>
    )
};

export default JustCompleted;