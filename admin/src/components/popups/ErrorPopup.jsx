import module from "./popup.module.scss"

const ErrorPopup = ({message}) => {

    return (
        <div className={module.popup}>{message}</div>
    )
}

export default ErrorPopup