import Styles from './custom_tooltip.module.scss';
const CustomToopTip = ({ children }: { children?: JSX.Element | JSX.Element[] }) => {
    return <div className={Styles.tooltip}>{children}</div>;
}

export const ToolTipForQuiz = ({ image, onNext, onClose }: { image: string, onNext: () => void, onClose: () => void }) => {
    return <div className={Styles.container}>
        <img src={image} alt="tooltip" className={Styles.image}/>
        <div className={Styles.nav}>
            <div className={Styles.close} onClick={onClose} >Close</div>
            <div className={Styles.next} onClick={onNext} >Next</div>
        </div>
    </div>
}

export default CustomToopTip;