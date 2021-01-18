import React, { useEffect } from 'react';
import Loader from '../../Loader/Loader';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, staggerChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    scale: 0,
    y: '-100vh',
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.4,
      type: 'spring',
      ease: 'easeInOut',
      stiffness: 50,
    },
  },
};

const Dashboard = () => {
  useEffect(() => {
    document.title = 'Champagne Deutz - Dashboard';
  }, []);

  return (
    <div className='dashboard'>
      <motion.div
        variants={containerVariants}
        initial='hidden'
        animate='visible'
        div
        className='dashboard__cards'
      >
        <motion.div
          className='card-container  dashboard__card-item'
          variants={itemVariants}
        >
          <div className='card-container__header bg-warning'>Pending Cards</div>
        </motion.div>
        <motion.div
          className='card-container dashboard__card-item'
          variants={itemVariants}
        >
          <div className='card-container__header bg-success'>
            Month Perfs Total: 0
          </div>
        </motion.div>
        <motion.div
          className='card-container dashboard__card-item'
          variants={itemVariants}
        >
          <div className='card-container__header bg-blue'>
            Last Customers Connection
          </div>
        </motion.div>
        <motion.div
          className='card-container dashboard__card-item'
          variants={itemVariants}
        >
          <div className='card-container__header bg-info'>Last Withdrawals</div>
        </motion.div>
        <motion.div
          className='card-container dashboard__card-item'
          variants={itemVariants}
        >
          <div className='card-container__header bg-info'>Last Desposits</div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
