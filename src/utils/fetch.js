import { Auth } from 'aws-amplify';

/**
 *
 *  duplicate of web project - to combine
 * 
 */

/**
 * Return headers including Cognito Auth headers
 */
const getHeaders = (json = false) => {
  return new Promise(async (resolve, reject) => {
    try {
      const authData = await Auth.currentSession();
      const idJwt = authData.getIdToken().getJwtToken();
      const headers = new Headers({ 'Authorization': idJwt });
      if (json) headers.set('Content-Type', 'application/json');
      resolve(headers);
    } catch (e) {
      reject(e);
    }
  });
};

/**
 * as fetch generally throws only for network connectivity, etc type issues,
 * use to throw for any non-ok status
 */
const fetchThrowable = async (url, options) => {
  const res = await fetch(url, options);
  if (!res.ok) throw new Error(res.statusText);
  return res;
};

const apiUrl = 'http://192.168.0.25' // 'http://localhost'; //process.env.REACT_APP_CORE_API_URL;

export {
  getHeaders,
  fetchThrowable,
  apiUrl,
};
