import LoadingIcon from "/src/assets/Loading-icon.svg"
import styles from "/src/components/Loading/styles.module.scss"

const Loaging = () => {
    return (
        <div className={styles.loading}>
            <img src={LoadingIcon} />
        </div>
    )
}

export { Loaging }