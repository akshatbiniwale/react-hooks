import React, { useContext, useEffect, useReducer, useState } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';
import InputCard from './InputCard';

const emailReducer = (state, action)=> {
  if(action.type === "USER_INPUT"){
    return {value: action.val, isValid: action.val.includes('@')}
  }else if(action.type === "INPUT_BLUR"){
    return ({value: state.value, isValid: state.value.includes('@')});
  }
  return {value: '', isValid: false}
}

const passwordReducer = (state, action)=> {
  if(action.type === "USER_PASS_INPUT"){
    return ({value: action.val, isValid: (action.val.trim().length > 6)});
  }else if(action.type === "INPUT_PASS_BLUR"){
    return ({value: state.value, isValid: (state.value.trim().length > 6)});
  }
  return {value: '', isValid: false}
}

const Login = () => {
  const authCtx = useContext(AuthContext);

  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();

  const [emailState, dispatchEmail] = useReducer(emailReducer, {value: '', isValid: null});
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {value: '', isValid: null});
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(()=> {
    const identifier = setTimeout(()=>{
      setFormIsValid(
        emailState.isValid && passwordState.isValid
      );
    }, 500)

    return ()=> {
      clearTimeout(identifier);
    }
  }, [emailState.isValid, passwordState.isValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({type: "USER_INPUT", val: event.target.value})

    setFormIsValid(
      emailState.isValid && passwordState.isValid
    );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type: "USER_PASS_INPUT", val: event.target.value});

    setFormIsValid(
      emailState.isValid && passwordState.isValid
    );
  };

  const validateEmailHandler = () => {
    dispatchEmail({type: "INPUT_BLUR"});
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type: "INPUT_PASS_BLUR"});
  };

  const submitHandler = (event) => {
    event.preventDefault();
    authCtx.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <InputCard 
          inputState={emailState}
          onInputChange={emailChangeHandler}
          toValidateInput={validateEmailHandler}
          textFor={"E-mail"}
          relate={"email"}
        />
        <InputCard 
          inputState={passwordState}
          onInputChange={passwordChangeHandler}
          toValidateInput={validatePasswordHandler}
          textFor={"Password"}
          relate={"password"}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
