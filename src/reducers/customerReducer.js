export default (state = {}, action) => {
  switch (action.type) {
    case 'CUSTOMER_LOG_IN': {
      console.log('data', action.payload);
      return { ...action.payload };
    }
    case 'CUSTOMER_LOG_OUT': {
      return {};
    }
    case 'GET_ALL': {
      return state;
    }
    default:
      return state;
  }
};
