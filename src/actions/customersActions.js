import api from '../apis/api';

export const login = (userDetails) => async (dispatch) => {
  try {
    const { data } = await api.post('/customers/login', userDetails);

    dispatch({
      type: 'CUSTOMER_LOG_IN',
      payload: data.customer,
    });
  } catch (error) {
    console.log(error);
  }
};

export const loadData = (token) => async (dispatch) => {
  try {
    const { data } = await api.post('/customers/validateToken', { token });
    dispatch({
      type: 'CUSTOMER_LOG_IN',
      payload: data,
    });
  } catch (error) {
    console.log('error', error);
  }
};

export const logOut = () => async (dispatch) => {
  try {
    const { data } = await api.post('customers/logOut');
    dispatch({
      type: 'CUSTOMER_LOG_OUT',
    });
  } catch (error) {}
};
