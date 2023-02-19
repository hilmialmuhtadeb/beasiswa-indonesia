import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

function isAccessTokenExist() {
  return localStorage.getItem('accessToken') !== null;
}

function getAccessToken() {
  return localStorage.getItem('accessToken');
}

function putAccessToken(accessToken) {
  return localStorage.setItem('accessToken', accessToken);
}

async function login({ email, password }) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    putAccessToken(userCredential.user.accessToken)
    return userCredential.user
  } catch (error) {
    console.log(error)
  }
}

export {
  login,
  isAccessTokenExist
}