import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
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
    const user = userCredential.user
    putAccessToken(user.accessToken)
    return user
  } catch (error) {
    console.log(error)
  }
}

async function register({ email, password, name }) {
  try {
    await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(auth.currentUser, { displayName: name })
    const user = auth.currentUser
    putAccessToken(user.accessToken)
    return user
  } catch (error) {
    console.log(error)
  }
}

export {
  register,
  login,
  isAccessTokenExist
}