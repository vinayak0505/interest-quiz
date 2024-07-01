import Styles from "./just_completed.module.scss";

const JustCompleted = ({onNext}: {onNext: () => void}) => {
    return <div className={Styles.container}>
        <div className={Styles.backgrond}></div>
        <div className={Styles.front}>
            <div className={Styles.skip}>Skip</div>
            <div className={Styles.planet}></div>
            <div className={Styles.rocket}></div>
        </div>
    </div>;
}; 

export default JustCompleted