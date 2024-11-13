import * as Qs from 'qs';
import toastr from 'toastr';
import { isObjEmpty, parseErrors } from '../utils/validation';

export default async function makeReq({
  url,
  method = 'GET',
  body = undefined,
  headers = {},
  queryParams = {},
  baseUrl = ''
} = {}) {
  let content_type = headers['Content-Type'];

  try {
    headers = { ...headers, ...(await getHeaders()) };
    const options = {
      method,
      headers
    };
    if (content_type === 'none') {
      delete options.headers['Content-Type'];
      if (body) { options.body = body; }
    } else {
      if (body) { options.body = JSON.stringify(body); }
    }

    let qs = '';
    if (Object.keys(queryParams).length) {
      qs = qs + '?' + Qs.stringify(queryParams);
    }

    const actualPath = `${baseUrl}${url}${qs}`;
    const csrfToken = document.querySelector("meta[name='csrf-token']").getAttribute("content");
    options.headers = { ...headers, 'X-CSRF-Token': csrfToken };
    const response = await fetch(actualPath, options);

    return await handleResponse(response);
  } catch (error) {
    if (isTimeOutError(error)) {
      toastr.error('Something went wrong.');
    }
    throw error;
  }
}

async function handleResponse(response) {
  if (response.ok) {
    return response?.json();
  }

  const errorResponse = await response.json();
  formatError(errorResponse, { status: response.status });
}

async function getHeaders() {
  function getAllCookies(cName) {
    const name = cName + '=';
    const cDecoded = decodeURIComponent(document.cookie);
    const cArr = cDecoded.split('; ');
    let res;
    cArr.forEach((val) => {
      if (val.indexOf(name) === 0) res = val.substring(name.length);
    });
    return res;
  }

  const myCookies = getAllCookies('XSRF-TOKEN');

  return {
    'Content-Type': 'application/json',
    'X-XSRF-TOKEN': myCookies,
    'X-CSRF-Token': myCookies
  };
}

function formatError(error, options = {}) {
  let formattedErrors;
  if (Array.isArray(error?.errors)) {
    formattedErrors = error.errors.join(', ');
  } else if (!isObjEmpty(error?.errors)) {
    parseErrors(error.errors);
    throw error;
  }

  const errorMessage =
    error?.messages?.join(', ') ||
    error?.message ||
    error?.error_messages?.join(', ') ||
    formattedErrors ||
    error?.error ||
    'Something went wrong.';

  throw {
    message: errorMessage,
    ...options
  };
}

function isTimeOutError(error) {
  return error.message === 'Timeout' ||
    error.message === 'Network request failed' ||
    error.message === 'Failed to fetch';
} 