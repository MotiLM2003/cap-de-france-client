"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStatusClassName = void 0;

var getStatusClassName = function getStatusClassName(customer) {
  var statusClassName = '';

  switch (customer.status) {
    case 0:
      {
        statusClassName = 'bg-gray-light';
        break;
      }

    case 1:
      {
        statusClassName = 'bg-warning';
        break;
      }

    case 2:
      {
        statusClassName = 'bg-success';
        break;
      }

    case 3:
      {
        statusClassName = 'bg-blue';
        break;
      }

    case 4:
      {
        statusClassName = 'bg-info';
        break;
      }

    case 5:
      {
        statusClassName = 'bg-info';
        break;
      }

    case 6:
      {
        statusClassName = 'bg-success';
        break;
      }

    case 7:
      {
        statusClassName = 'bg-blue-light';
        break;
      }

    case 8:
      {
        statusClassName = 'bg-blue-light';
        break;
      }
  }

  return statusClassName;
};

exports.getStatusClassName = getStatusClassName;