import React, { useState, useEffect, useRef } from 'react';

import api from '../../../apis/api';
import { connect } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import FormModel from '../../FormModel/FormModel';
import { newUser } from '../../../utils/models';
import SelectCountry from '../../SelectCountry';
import { ToastContainer, toast } from 'react-toastify';
import Loader from '../../Loader/Loader';
import PaginationToolbar from './PaginationToolbar';
import CustomerItem from './CustomerItem';
import Filters from './Filters';

const sFilters = {
  firstName: '',
  lastName: '',
  phone: '',
  status: '0',
  email: '',
  country: '0',
  campaign: '0',
  startDate: '',
  endDate: '',
};

let totalPages = 1;
let firstLoad = false;

const Customers = (props) => {
  const [customers, setCustomers] = useState(null);
  const [isNewUser, setIsNewUser] = useState(false);
  const [newCustomer, setNewCustomer] = useState(newUser);
  const [formError, setFormError] = useState('');
  const [filters, setFilters] = useState(sFilters);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [orderBy, setOrderBy] = useState('_id');
  const [limit, setLimit] = useState(100);
  const fnRef = useRef();
  const lnRef = useRef();
  const phRef = useRef();
  const emRef = useRef();

  const getByOwner = async (filters) => {
    setIsLoading(true);
    firstLoad = true;

    try {
      const { data } = await api.post('/customers/get-by-owner', {
        filters,
        page,
        limit,
        orderBy,
      });
      const { customers, count } = data;
      setCustomers(customers);
      setTotalRecords(count);
    } catch (error) {
      setIsLoading(false);
      toast.warning('Error loading data');
      console.log(error);
    }

    setNewCustomer({
      ...newCustomer,
      userName: newCustomer.firstName,
      owner: props.user._id,
    });
  };
  useEffect(() => {
    if (customers) {
      setIsLoading(false);
    }
  }, [customers]);

  useEffect(() => {
    getByOwner(filters);
  }, []);

  useEffect(() => {
    if (customers) {
      getByOwner(filters);
    }
  }, [orderBy]);

  useEffect(() => {
    if (customers) {
      getByOwner(filters);
    }
  }, [filters.country, filters.status, filters.campaign, page]);

  useEffect(() => {
    totalPages = Math.ceil(totalRecords / limit);
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [totalRecords]);
  const dataChanged = (e) => {
    setNewCustomer({ ...newCustomer, [e.target.name]: e.target.value });
  };

  const addComment = async (comment) => {
    try {
      const { data } = await api.post('/comments/', comment);
      toast.info('😍 New comment created.', {
        position: 'bottom-left',
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: false,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const saveUser = async () => {
    if (
      newCustomer.firstName.length < 2 ||
      newCustomer.lastName.length < 2 ||
      newCustomer.email.length < 2 ||
      newCustomer.userPassword.length < 2 ||
      newCustomer.phone.length < 2 ||
      newCustomer.country === '0'
    ) {
      setFormError('All fields must be set.');
    } else {
      const { data } = await api.post('/customers/register', newCustomer);
      setIsNewUser(false);
      toast.info('🤑 Customer created.', {
        position: 'bottom-left',
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: false,
      });
      setNewCustomer(newUser);
    }
  };

  const filtersChanged = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const updateCustomer = async (customer) => {
    const newStatus = { ...customer, status: customer.status - 1 };

    setCustomers(
      customers.map((c) => {
        if (c._id === customer._id) {
          return newStatus;
        }
        return c;
      })
    );
    ('trying');
    try {
      const { data } = await api.patch('customers/update', {
        _id: customer._id,
        update: { status: customer.status - 1 },
      });
      ('here');
      toast.info('🤟 Status updated.', {
        position: 'bottom-left',
        autoClose: 2500,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5,
      },
    },
  };

  return (
    <div className='customers'>
      {isLoading && <Loader />}
      <FormModel isVisible={isNewUser}>
        <div className='new-customer'>
          <div className='form-model__header'>New Customer</div>
          <div className='divider'></div>
          {formError && (
            <div className='new-customer__error bg-warning'>{formError}</div>
          )}
          <input
            type='text'
            name='lastName'
            value={newCustomer.lastName}
            placeholder='Last Name'
            onChange={dataChanged}
          />
          <input
            type='text'
            name='firstName'
            placeholder='First Name'
            value={newCustomer.firstName}
            onChange={dataChanged}
          />
          <input
            type='text'
            name='email'
            placeholder='Email'
            value={newCustomer.email}
            onChange={dataChanged}
          />
          <input
            type='text'
            name='phone'
            placeholder='Phone'
            value={newCustomer.phone}
            onChange={dataChanged}
          />
          <SelectCountry country={newCustomer.country} onChange={dataChanged} />
          <input
            type='password'
            name='userPassword'
            placeholder='Password'
            value={newCustomer.userpassword}
            onChange={dataChanged}
          />

          <div className='divider'></div>
          <div className='new-customer__tollbar'>
            <button
              className='button'
              onClick={() => {
                setIsNewUser(false);
              }}
            >
              Cancel
            </button>
            <button className='button bg-blue' onClick={saveUser}>
              Save Changes
            </button>
          </div>
        </div>
      </FormModel>
      <PaginationToolbar
        page={page}
        totalPages={totalPages}
        onChange={(e) => {
          setPage(e.target.value);
        }}
        totalRecords={totalRecords}
        previousPage={(e) => {
          if (page > 1) {
            setPage((prev) => prev - 1);
          }
        }}
        nextPage={(e) => {
          if (parseInt(page) < parseInt(totalPages)) {
            setPage((prev) => prev + 1);
          }
        }}
      />
      <div className='customers__toolbar'>
        <div>
          <button
            className='customers__button button bg-warning'
            onClick={() => setFilters({ ...filters, status: 1 })}
          >
            New
          </button>
          <button
            className='customers__button button bg-success'
            onClick={() => setFilters({ ...filters, status: 7 })}
          >
            Deposit
          </button>
          <button
            className='customers__button button bg-blue'
            onClick={() => setFilters({ ...filters, status: 9 })}
          >
            Interested
          </button>
          <button
            className='customers__button button bg-info'
            onClick={() => {
              getByOwner(filters);
            }}
          >
            Search
          </button>
          <button
            className='customers__button  button bg-warning'
            onClick={() => {
              setFilters({ ...sFilters });
              getByOwner(sFilters);
              fnRef.current.value = '';
              lnRef.current.value = '';
              phRef.current.value = '';
              emRef.current.value = '';
              setPage(1);
            }}
          >
            Reset
          </button>
        </div>
        <div>
          <button
            className='customers__button button bg-success'
            onClick={() => setIsNewUser(true)}
          >
            Add New
          </button>
        </div>
      </div>
      <div className='customers__table-container'>
        <motion.table
          className='customers__table'
          variants={container}
          initial='hidden'
          animate='show'
        >
          <thead>
            <tr className='bg-grey'>
              <th>
                <input type='checkbox' />
              </th>
              <th>id #</th>
              <th onClick={() => setOrderBy('createAt')}>Date</th>
              <th onClick={() => setOrderBy('firstName')}>First Name</th>
              <th onClick={() => setOrderBy('lastName')}>Last Name</th>
              <th onClick={() => setOrderBy('phone')}>Phone</th>
              <th onClick={() => setOrderBy('status')}>Status</th>
              <th onClick={() => setOrderBy('email')}>Email</th>
              <th onClick={() => setOrderBy('country')}>Country</th>
              <th onClick={() => setOrderBy('owner')}>Owner</th>
              <th>Real Deposit</th>
              <th onClick={() => setOrderBy('campaign')}>Campaign</th>
              <th>...</th>
            </tr>
            <Filters
              filters={filters}
              setFilters={setFilters}
              fnRef={fnRef}
              filtersChanged={filtersChanged}
              lnRef={lnRef}
              phRef={phRef}
              emRef={emRef}
            />
          </thead>
          <tbody>
            {customers &&
              customers.map((customer, index) => (
                <CustomerItem
                  updateCustomer={updateCustomer}
                  key={customer._id}
                  customer={customer}
                  index={index}
                  addComment={addComment}
                />
              ))}
          </tbody>
        </motion.table>
      </div>
      <ToastContainer />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.userReducer,
  };
};

export default connect(mapStateToProps)(Customers);
