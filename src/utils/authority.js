import { Base64 } from 'js-base64';

// use localStorage to store the authority info, which might be sent from server in actual project.
export function jwtToUser(jwt) {
  const jwtArray = jwt.split('.');
  return JSON.parse(Base64.decode(jwtArray[1]));
}

export function getUserInfo() {
  const jwt = localStorage.getItem(`hzttweb-jwt`);
  if (jwt && jwt !== '') {
    return jwtToUser(jwt);
  }
  return false;
}

export function getAuthority() {
  const userInfo = getUserInfo();
  let authorityString = 'guest';
  let authority;
  if (userInfo && userInfo.time + 86400000 > new Date().getTime()) {
    authorityString = userInfo.role;
  }
  try {
    authority = JSON.parse(authorityString);
  } catch (e) {
    authority = authorityString;
  }
  if (typeof authority === 'string') {
    return [authority];
  }
  return authority;
}

export function setAuthority(jwt) {
  return localStorage.setItem('hzttweb-jwt', jwt);
}
