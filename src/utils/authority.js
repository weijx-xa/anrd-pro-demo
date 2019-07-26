import { Base64 } from 'js-base64';

// // use localStorage to store the authority info, which might be sent from server in actual project.
// export function getAuthority(str) {
//   // return localStorage.getItem('antd-pro-authority') || ['admin', 'user'];
//   const authorityString =
//     typeof str === 'undefined' ? localStorage.getItem('antd-pro-authority') : str;
//   // authorityString could be admin, "admin", ["admin"]
//   let authority;
//   try {
//     authority = JSON.parse(authorityString);
//   } catch (e) {
//     authority = authorityString;
//   }
//   if (typeof authority === 'string') {
//     return [authority];
//   }
//   // preview.pro.ant.design only do not use in your production ; preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
//   if (!authority && ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
//     return ['admin'];
//   }
//   return authority;
// }

export function setAuthority(authority) {
  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  return localStorage.setItem('antd-pro-authority', JSON.stringify(proAuthority));
}
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
  if (userInfo && userInfo.logintime + 86400000 > new Date().getTime()) {
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
