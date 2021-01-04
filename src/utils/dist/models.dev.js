"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newUser = void 0;

var _newUser;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var newUser = (_newUser = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  country: '0',
  userName: '',
  password: ''
}, _defineProperty(_newUser, "userName", ''), _defineProperty(_newUser, "userPassword", ''), _defineProperty(_newUser, "passwordConfirm", ''), _defineProperty(_newUser, "isAgreed", false), _newUser);
exports.newUser = newUser;