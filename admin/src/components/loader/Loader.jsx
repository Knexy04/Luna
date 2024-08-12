import module from "./loader.module.scss"

const Loader = () => {
    return (
        <div className={module.page}>
            <span className={module.loader}/>
        </div>
    )
}

export default Loader