import React, { useState, useEffect, useRef } from 'react';

import api from '../../../apis/api';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import FormModel from '../../FormModel/FormModel';

import { newUser } from '../../../utils/models';
import SelectCountry from '../../SelectCountry';
import SelectCampaign from '../../SelectCampaign';
import SelectStatus from '../../SelectStatus';
import { ToastContainer, toast } from 'react-toastify';
import Loader from '../../Loader/Loader';
import 'react-datepicker/dist/react-datepicker.css';
import PaginationToolbar from './PaginationToolbar';
import CustomerItem from './CustomerItem';

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

const Customers = (props) => {
  const [customers, setCustomers] = useState(null);
  const [isNewUser, setIsNewUser] = useState(false);
  const [newCustomer, setNewCustomer] = useState(newUser);
  const [formError, setFormError] = useState('');
  const [filters, setFilters] = useState(sFilters);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [limit, setLimit] = useState(100);
  const fnRef = useRef();
  const lnRef = useRef();
  const phRef = useRef();
  const emRef = useRef();
  const getByOwner = async (filters) => {
    setIsLoading(true);
    try {
      const { data } = await api.post('/customers/get-by-owner', {
        filters,
        page,
        limit,
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
    getByOwner(filters);
  }, []);

  useEffect(() => {
    if (customers && customers.length > 0) {
      setIsLoading(false);
    }
  }, [customers]);

  useEffect(() => {
    if (customers && customers.length > 0) {
      getByOwner(filters);
    }
  }, [filters.country, filters.status, filters.campaign, page]);

  useEffect(() => {
    totalPages = Math.ceil(totalRecords / limit);
  }, [totalRecords]);
  const dataChanged = (e) => {
    setNewCustomer({ ...newCustomer, [e.target.name]: e.target.value });
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
      toast.info('🦄 Customer created.', {
        position: 'bottom-left',
        autoClose: 3000,
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
          const page = e.target.value;
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
        <table className='customers__table'>
          <thead>
            <tr className='bg-grey'>
              <th>
                <input type='checkbox' />
              </th>
              <th>id #</th>
              <th>Date</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Email</th>
              <th>Country</th>
              <th>Owner</th>
              <th>Real Deposit</th>
              <th>Campaign</th>
            </tr>
            <tr className='bg-white'>
              <th>&nbsp;</th>
              <th rowSpan='1' colSpan='1'>
                &nbsp;
              </th>
              <th rowSpan='1' colSpan='1' className='customers__search-dates'>
                <div>
                  <DatePicker
                    selected={filters.startDate}
                    onChange={(date) =>
                      setFilters({ ...filters, startDate: date })
                    }
                  />
                </div>
                <div>
                  <DatePicker
                    selected={filters.endDate}
                    onChange={(date) =>
                      setFilters({ ...filters, endDate: date })
                    }
                  />
                </div>
              </th>
              <th rowSpan='1' colSpan='1'>
                <div>
                  <input
                    ref={fnRef}
                    type='text'
                    name='firstName'
                    onChange={filtersChanged}
                  />
                </div>
              </th>
              <th rowSpan='1' colSpan='1'>
                <div>
                  <input
                    type='text'
                    ref={lnRef}
                    name='lastName'
                    onChange={filtersChanged}
                  />
                </div>
              </th>
              <th rowSpan='1' colSpan='1'>
                <div>
                  <input
                    type='text'
                    ref={phRef}
                    name='phone'
                    onChange={filtersChanged}
                  />
                </div>
              </th>
              <th>
                <SelectStatus
                  value={filters.status}
                  onChange={filtersChanged}
                  name='status'
                />
              </th>
              <th rowSpan='1' colSpan='1'>
                <div>
                  <input
                    type='text'
                    name='email'
                    ref={emRef}
                    onChange={filtersChanged}
                  />
                </div>
              </th>
              <th>
                <SelectCountry
                  value={filters.country}
                  onChange={filtersChanged}
                />
              </th>
              <th>&nbsp;</th>
              <th className='customers__search-buttons'>
                <div>
                  <button
                    className='button bg-info'
                    onClick={() => {
                      getByOwner(filters);
                    }}
                  >
                    Search
                  </button>
                </div>
                <div>
                  <button
                    className='button bg-warning'
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
              </th>
              <th>
                <SelectCampaign
                  value={filters.campaign}
                  onChange={filtersChanged}
                  name='campaign'
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {customers &&
              customers.map((customer, index) => (
                <CustomerItem
                  key={customer._id}
                  customer={customer}
                  index={index}
                />
              ))}
          </tbody>
        </table>
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
