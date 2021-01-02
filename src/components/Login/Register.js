import React, { useState, useEffect } from 'react';
import img from '../../images/logo-cdf.png';
import { Link } from 'react-router-dom';
import SelectCountry from './SelectCountry';
import { motion } from 'framer-motion';
import Error from './Error';
const formObect = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  country: '0',
  userName: '',
  password: '',
  userName: '',
  userPassword: '',
  passwordConfirm: '',
  isAgreed: false,
};
const Register = () => {
  const [formData, setFormData] = useState(formObect);

  const [formErrors, setFormErrors] = useState({ ...formObect, isAgreed: '' });
  const dataChanged = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isAgrredChanged = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked });
  };
  const containerVariants = {
    hidden: {
      opacity: 1,
    },
    visible: {
      opacity: 1,
      transition: { duration: 0.3, when: 'beforeChildren' },
    },
  };

  const onLogin = (e) => {
    setFormErrors({ ...formObect });
    if (formData.firstName.length < 2) {
      setFormErrors((prev) => ({ ...prev, firstName: 'Required field' }));
    }
    if (formData.lastName.length < 2) {
      setFormErrors((prev) => ({ ...prev, lastName: 'Required field' }));
    }
    if (formData.email.length < 2) {
      setFormErrors((prev) => ({ ...prev, email: 'Required field' }));
    }

    if (formData.country === '0') {
      setFormErrors((prev) => ({ ...prev, country: 'Required field' }));
    }
    if (formData.phone.length < 2) {
      setFormErrors((prev) => ({ ...prev, phone: 'Required field' }));
    }
    if (formData.userName.length < 2) {
      setFormErrors((prev) => ({ ...prev, userName: 'Required field' }));
    }
    if (formData.userPassword.length < 2) {
      setFormErrors((prev) => ({ ...prev, userPassword: 'Required field' }));
    }
    if (formData.passwordConfirm.length < 2) {
      setFormErrors((prev) => ({ ...prev, passwordConfirm: 'Required field' }));
    }
    if (!formData.isAgreed) {
      setFormErrors((prev) => ({ ...prev, isAgreed: 'Required field' }));
    }
  };
  return (
    <motion.div
      className='login-container register'
      variants={containerVariants}
      initial='hidden'
      animate='visible'
    >
      <div className='login-container__login-info register__login-info mt-15'>
        <img src={img} alt='logo' />
        <div className='card-container bg-transparent-white login-container__form_fields'>
          <input
            type='text'
            placeholder='Nom de famille'
            value={formData.firstName}
            name='firstName'
            onChange={dataChanged}
          />
          {formErrors.firstName && <Error error={formErrors.firstName} />}
          <input
            type='text'
            placeholder='Prénom'
            value={formData.lastName}
            onChange={dataChanged}
            name='lastName'
          />
          {formErrors.lastName && <Error error={formErrors.lastName} />}
          <input
            type='text'
            placeholder='E-Mail'
            value={formData.email}
            onChange={dataChanged}
            name='email'
          />
          {formErrors.email && <Error error={formErrors.email} />}
          <input
            type='text'
            placeholder='Téléphone'
            value={formData.phone}
            onChange={dataChanged}
            name='phone'
          />
          {formErrors.phone && <Error error={formErrors.phone} />}
          <SelectCountry value={formData.country} onChange={dataChanged} />
          {formErrors.country !== '0' && <Error error={formErrors.country} />}

          <p>Détails de votre compte:</p>
          <input
            type='text'
            placeholder='Username'
            value={formData.userName}
            onChange={dataChanged}
            name='userName'
          />
          {formErrors.userName && <Error error={formErrors.userName} />}
          <input
            type='password'
            placeholder='Password'
            value={formData.userPassword}
            onChange={dataChanged}
            name='userPassword'
          />
          {formErrors.userPassword && <Error error={formErrors.userPassword} />}

          <input
            type='password'
            placeholder='confirmation password'
            value={formData.passwordConfirm}
            onChange={dataChanged}
            name='passwordConfirm'
          />
          {formErrors.passwordConfirm && (
            <Error error={formErrors.passwordConfirm} />
          )}
          <div className='mt-2 mb-2'>
            <input
              type='checkbox'
              name='chbAgreement'
              id='chbAgreement'
              value={formData.isAgreed}
              onChange={isAgrredChanged}
              name='isAgreed'
            />
            <label for='chbAgreement'>
              I agree to the Terms of Service and Privacy Policy
            </label>
          </div>
          {formErrors.isAgreed && <Error error={formErrors.isAgreed} />}
          <div class='register__buttons'>
            <Link
              to='/'
              class='button bg-gray-light mt-1 login-container__login_button'
            >
              Retour
            </Link>
            <button
              class='button bg-blue mt-1 login-container__login_button'
              onClick={onLogin}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Register;
