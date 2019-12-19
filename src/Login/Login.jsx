import React from 'react';
import "./Login.css"
import * as yup from 'yup';
import { StoreContext } from '../Store/Store';
import { login } from '../Store/actions';
import { useFormControl, getValidationsRunnerForSchema } from '../shared/hoc/withForm';

const validations = {
  username: yup.string()
    .required('Username is required')
    .min(4, 'Username should be more than 4 chars'),

  password: yup.string()
    .required('Password is required')
    .min(6, 'Password must be more than 6 chars')
}

const schema = yup.object().shape(validations);

const validationsRunner = getValidationsRunnerForSchema(schema);


const Login = () => {
  const { dispatch } = React.useContext(StoreContext);
  
  const usernameFormControl = useFormControl('', validations.username);
  const passwordFormControl = useFormControl('', validations.password);

  // React.useEffect(() => {
  //   if (!!state.user) { history.push('/'); }
  // }, [state.user, history]);

  const submitHandler = React.useCallback((event)=> {
    event.preventDefault();
    validationsRunner({
      username: usernameFormControl.value,
      password: passwordFormControl.value
    }).then(data => {
      console.log(data);
      dispatch(login(data));
    }).catch(errors => {
      if (errors.username) { usernameFormControl.setErrors(errors.username); }
      if (errors.password) { passwordFormControl.setErrors(errors.password); }
    })
  }, [usernameFormControl, passwordFormControl, dispatch]);
    

    return <div className="form-container">
    <form>
      <label>Username</label>
      <input className="login-input" type="text" onChange={usernameFormControl.changeHandler} id="fname" name="firstname" placeholder="Your name.."/>
      {usernameFormControl.errors && usernameFormControl.errors[0]}

      <label>Password</label>
      <input className="login-input" type="password" onChange={passwordFormControl.changeHandler} id="lname" name="lastname" placeholder="Your last name.."/>
      {passwordFormControl.errors && passwordFormControl.errors[0]}
      

      <input className="btn-input" onClick={submitHandler} type="submit" value="Login"/>
    </form>
  </div>
       
}


export default Login;