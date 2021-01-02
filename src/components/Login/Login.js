import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { motion } from 'framer-motion';
import { login } from '../../actions/userActions';
import Error from './Error';

import img from '../../images/logo-cdf.png';
const containerVariants = {
  hidden: {
    opacity: 0.2,
  },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, when: 'beforeChildren' },
  },
};

const logoVariant = {
  hidden: {
    opacity: 0,
    y: -50,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: { delay: 0.2, duration: 0.3, type: 'spring', stiffness: 120 },
  },
};

const Login = (props) => {
  const [userDetails, setUserDetails] = useState({
    email: 'motiphone2003@gmail.com',
    password: '1234',
    hasError: false,
  });

  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const _isSignedIn = !!props.user?._id;
    setIsSignedIn(_isSignedIn);
  }, [props.user?._id]);
  const onChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const initLogin = () => {
    const hasError =
      userDetails.email.length < 2 || userDetails.password.length < 2;
    setUserDetails({
      ...userDetails,
      hasError,
    });

    if (!hasError) {
      props.login(userDetails);
    }
  };

  return isSignedIn ? (
    <Redirect to='/dashboard' />
  ) : (
    <motion.div
      class='login-container p-1'
      variants={containerVariants}
      initial='hidden'
      animate='visible'
    >
      <div className='login-container__login-info mt-15'>
        <motion.img src={img} alt='logo' variants={logoVariant} />
        <div className='card-container bg-transparent-white login-container__form_fields'>
          <input
            type='text'
            placeholder='Email ou Username'
            className='mb-2'
            name='email'
            onChange={onChange}
            value={userDetails.email}
          />
          {}
          <input
            type='password'
            placeholder='Password'
            className='mb-1'
            name='password'
            onChange={onChange}
            value={userDetails.password}
          />
          <motion.button
            class='button bg-blue mt-1 mb-2 login-container__login_button'
            onClick={initLogin}
          >
            Login
          </motion.button>
          {userDetails.hasError && <Error error='Wrong credentials.' />}
          <div className='divider mt-1'></div>
          <p className='login-container__register mt-6'>
            Pas encore de compte?&nbsp;
            <Link className='button bg-gray-light ' to='/register'>
              Créer un compte
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const stateToProps = (state) => {
  return {
    user: state.userReducer,
  };
};

export default connect(stateToProps, { login })(Login);
