import Styles from './custom_tooltip.module.scss';
const CustomToopTip = ({ children }: { children?: JSX.Element | JSX.Element[] }) => {
    return <div className={Styles.tooltip}>{children}</div>;
}

export const ToolTipForQuiz = ({ image, onNext, onClose, showFinishButton }: { image: string, onNext: () => void, onClose: () => void, showFinishButton: boolean }) => {
    return <div className={Styles.container}>
        <img src={image} alt="tooltip" className={Styles.image} />
        {
            showFinishButton ?
                <div className={Styles.button} onClick={onClose}>Let’s Begin</div>
                : <div className={Styles.nav}>
                    <div className={Styles.close} onClick={onClose} >Skip</div>
                    <div className={Styles.next} onClick={onNext} >Next</div>
                </div>
        }

    </div>
}

export default CustomToopTip;