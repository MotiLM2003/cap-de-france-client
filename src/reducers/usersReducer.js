export default (state = {}, action) => {
  console.log('in reducer');
  switch (action.type) {
    case 'LOG_IN': {
      console.log('login in', action.payload);
      return { ...action.payload };
    }
    case 'LOG_OUT': {
      return {};
    }
    case 'GET_ALL': {
      return state;
    }
    default:
      return state;
  }
};
