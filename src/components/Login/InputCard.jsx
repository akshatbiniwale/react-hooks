import classes from './Login.module.css'

const InputCard = (props)=> {
    return (
        <div className={`${classes.control} ${props.inputState.isValid === false ? classes.invalid : ''}`}>
            <label htmlFor={props.relate}>{props.textFor}</label>
            <input
                type={props.relate}
                id={props.relate}
                value={props.inputState.value}
                onChange={props.onInputChange}
                onBlur={props.toValidateInput}
                autoComplete='off'
            />
        </div>
    );
}

export default InputCard;