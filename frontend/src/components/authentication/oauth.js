import jwt_decode from 'jwt-decode';

export function loggedIn() {
  return (localStorage["access-token"] && !isTokenExpired(localStorage["access-token"]))
    ? localStorage["access-token"]
    : "";
}

function isTokenExpired(token){
  try {
    const decoded = jwt_decode(token);
    return decoded.exp < Date.now() / 1000;
  }
  catch (err) {
    return false;
  }
}

export function logOut() {
  return localStorage["access-token"] = "";
}