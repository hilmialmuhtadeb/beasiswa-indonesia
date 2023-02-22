import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { auth } from "./firebase";

function isAccessTokenExist() {
  return localStorage.getItem('accessToken') !== null;
}

function removeAccessToken() {
  return localStorage.removeItem('accessToken');
}

function getAccessToken() {
  return localStorage.getItem('accessToken');
}

function putAccessToken(accessToken) {
  return localStorage.setItem('accessToken', accessToken);
}

async function register({ email, password, name }) {
  try {
    await createUserWithEmailAndPassword(auth, email, password)
    const user = auth.currentUser
    await updateProfile(user, { displayName: name })
    putAccessToken(user.accessToken)
    return user
  } catch (error) {
    console.log(error)
  }
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

async function logout() {
  await signOut(auth)
  removeAccessToken()
}

export {
  register,
  login,
  logout,
  isAccessTokenExist
}