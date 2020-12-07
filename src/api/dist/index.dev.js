"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchAPI = fetchAPI;
exports.hitAPI = exports.auth = exports.clearToken = exports.getToken = void 0;
var BASE_URL = "https://fitnesstrac-kr.herokuapp.com/api";

function fetchAPI(url) {
  var method,
      sendData,
      fetchOptions,
      response,
      data,
      _args = arguments;
  return regeneratorRuntime.async(function fetchAPI$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          method = _args.length > 1 && _args[1] !== undefined ? _args[1] : "GET";
          sendData = _args.length > 2 && _args[2] !== undefined ? _args[2] : null;
          fetchOptions = {
            method: method,
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjAzLCJ1c2VybmFtZSI6ImV2b25zYW5kZXJzIiwiaWF0IjoxNjA2MTgyNzM2LCJleHAiOjE2MDY3ODc1MzZ9.ZRFmbahrnLeJhfc8s-OtsAve2r41MlkReZyJcLtvUCo"
            }
          };

          if (sendData) {
            fetchOptions.body = JSON.stringify(sendData);
          }

          _context.next = 6;
          return regeneratorRuntime.awrap(fetch(url, fetchOptions));

        case 6:
          response = _context.sent;
          _context.next = 9;
          return regeneratorRuntime.awrap(response.json());

        case 9:
          data = _context.sent;
          return _context.abrupt("return", data);

        case 11:
        case "end":
          return _context.stop();
      }
    }
  });
}

var getToken = function getToken() {
  return localStorage.getItem("auth-token");
};

exports.getToken = getToken;

var clearToken = function clearToken() {
  localStorage.removeItem("auth-token");
};

exports.clearToken = clearToken;

var setToken = function setToken(token) {
  localStorage.setItem("auth-token", token);
};

function buildHeaders() {
  var base = {
    'Content-Type': 'application/json'
  };

  if (getToken()) {
    base['Authorization'] = "Bearer ".concat(getToken());
  }

  return base;
}

var auth = function auth(username, password) {
  var isNew,
      url,
      response,
      _ref,
      error,
      user,
      token,
      _args2 = arguments;

  return regeneratorRuntime.async(function auth$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          isNew = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : false;
          url = "".concat(BASE_URL, "/users") + (isNew ? '/register' : '/login');
          _context2.next = 4;
          return regeneratorRuntime.awrap(fetch(url, {
            method: 'POST',
            headers: buildHeaders(),
            body: JSON.stringify({
              username: username,
              password: password
            })
          }));

        case 4:
          response = _context2.sent;
          _context2.next = 7;
          return regeneratorRuntime.awrap(response.json());

        case 7:
          _ref = _context2.sent;
          error = _ref.error;
          user = _ref.user;
          token = _ref.token;

          if (!error) {
            _context2.next = 13;
            break;
          }

          throw Error(error.message);

        case 13:
          if (token) {
            setToken(token);
          } //return data


        case 14:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.auth = auth;

var hitAPI = function hitAPI(method, endpoint, bodyObj) {
  var payload, response, data;
  return regeneratorRuntime.async(function hitAPI$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          payload = {
            method: method,
            headers: buildHeaders()
          };

          if (bodyObj) {
            payload.body = JSON.stringify(bodyObj);
          }

          _context3.next = 4;
          return regeneratorRuntime.awrap(fetch("".concat(BASE_URL).concat(endpoint), payload));

        case 4:
          response = _context3.sent;
          _context3.next = 7;
          return regeneratorRuntime.awrap(response.json());

        case 7:
          data = _context3.sent;
          return _context3.abrupt("return", data);

        case 9:
        case "end":
          return _context3.stop();
      }
    }
  });
};

exports.hitAPI = hitAPI;