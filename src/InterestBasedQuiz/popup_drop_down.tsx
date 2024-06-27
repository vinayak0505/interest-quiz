import { useEffect, useRef } from "react";
import Styles from "./popup_drop_down.module.scss";


const PopupDropDown = ({ children, mobileChildren, webChildren }: { children?: JSX.Element | JSX.Element[], mobileChildren?: JSX.Element | JSX.Element[], webChildren?: JSX.Element | JSX.Element[] }) => {
    const isMobile = window.matchMedia("(max-width: 700px)").matches;

    return <div className={Styles.popup_drop_down}>
        {
            isMobile ? <DropDown >{mobileChildren ?? children}</DropDown> : <PopUp >{webChildren ?? children}</PopUp>
        }
    </div>
}

const DropDown = ({ children }: { children?: JSX.Element | JSX.Element[] }) => {
    return <div className={Styles.drop_down}>{children}</div>;
}

const PopUp = ({ children }: { children?: JSX.Element | JSX.Element[] }) => {
    return <div className={Styles.pop_up}>{children}</div>;
}

export default PopupDropDown;