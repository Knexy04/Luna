import module from './title.module.css'

const Title = ({title}) => {
    return (
        <div className={module.titleContainer}>
            <span className={module.title}>{title}</span>
        </div>
    )
}

export default Title