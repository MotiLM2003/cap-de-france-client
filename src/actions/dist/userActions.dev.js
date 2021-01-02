"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logOut = exports.loadData = exports.login = void 0;

var _api = _interopRequireDefault(require("../apis/api"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var login = function login(userDetails) {
  return function _callee(dispatch) {
    var _ref, data;

    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return regeneratorRuntime.awrap(_api["default"].post('/users/login', userDetails));

          case 3:
            _ref = _context.sent;
            data = _ref.data;
            dispatch({
              type: 'LOG_IN',
              payload: data.user
            }); //   dispatch()

            _context.next = 11;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 8]]);
  };
};

exports.login = login;

var loadData = function loadData(token) {
  return function _callee2(dispatch) {
    var _ref2, data;

    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return regeneratorRuntime.awrap(_api["default"].post('/users/validateToken', {
              token: token
            }));

          case 3:
            _ref2 = _context2.sent;
            data = _ref2.data;
            dispatch({
              type: 'LOG_IN',
              payload: data
            });
            _context2.next = 11;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](0);
            console.log('error', _context2.t0);

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[0, 8]]);
  };
};

exports.loadData = loadData;

var logOut = function logOut() {
  return function _callee3(dispatch) {
    var _ref3, data;

    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return regeneratorRuntime.awrap(_api["default"].post('users/logOut'));

          case 3:
            _ref3 = _context3.sent;
            data = _ref3.data;
            dispatch({
              type: 'LOG_OUT'
            });
            _context3.next = 10;
            break;

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3["catch"](0);

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, null, null, [[0, 8]]);
  };
};

exports.logOut = logOut;