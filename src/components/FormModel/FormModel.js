import React from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

const containerVariant = {
  hidden: {
    scale: 0,
    borderRadius: 1200,
  },
  visible: {
    scale: 1,
    borderRadius: 1,
    transition: { duration: 0.5, when: 'beforeChildren' },
  },
};

const cardVariant = {
  hidden: {
    top: '-100vh',
    // opacity: 0,
  },
  visible: {
    // opacity: 0.9,
    top: '40%',
    transition: {
      duration: 0.5,
      when: 'beforeChildren',
      type: 'spring',
      damping: 12,
      stiffness: 100,
    },
  },
};

const FormModel = (props) => {
  const modelRender = () => {
    return props.isVisible ? (
      <React.Fragment>
        <motion.div
          className='form-model'
          variants={containerVariant}
          initial='hidden'
          animate='visible'
        >
          <motion.div className='form-model__card' variants={cardVariant}>
            {props.children}
          </motion.div>
        </motion.div>
      </React.Fragment>
    ) : (
      'null'
    );
  };
  return ReactDOM.createPortal(
    modelRender(),

    document.getElementById('form-model')
  );
};

export default FormModel;
