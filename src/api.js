// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore"; //realtime data

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBY7aMkxLU3zSnItlzzgNLFB4BxV9ED6mE",
  authDomain: "vanlife-b7d59.firebaseapp.com",
  projectId: "vanlife-b7d59",
  storageBucket: "vanlife-b7d59.appspot.com",
  messagingSenderId: "808809802680",
  appId: "1:808809802680:web:f945aa70fa11f406f2fd4d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const vansCollectionRef = collection(db, "vans");
const userRef = collection(db, "user");

export async function getVans() {
  const querySnapshot = await getDocs(vansCollectionRef);
  const dataArr = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return dataArr;
}

export async function getVan(id) {
  const docRef = doc(db, "vans", id);
  const vanSnapshot = await getDoc(docRef);
  return {
    ...vanSnapshot.data(),
    id: vanSnapshot.id,
  };
}

export async function loginUser(email, password) {
  const usersQuery = query(
    userRef,
    where("email", "==", email && "password", "==", password)
  );
  const usersQuerySnapshot = await getDocs(usersQuery);
  const userArray = usersQuerySnapshot.docs.map((user) => ({
    ...user.data(),
  }));
  return userArray;
}

/* export async function getVans(id) {
  const url = id ? `/api/vans/${id}` : "/api/vans";
  const res = await fetch(url);
  if (!res.ok) {
    throw {
      message: "Failed to fetch vans",
      statusText: res.statusText,
      status: res.status,
    };
  }
  const data = await res.json();
  return data.vans;
} */

export async function getHostVans() {
  const q = query(vansCollectionRef, where("hostId", "==", "123"));
  const querySnapshot = await getDocs(q);
  const dataArr = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return dataArr;
}

/* export async function getHostVans(id) {
  const url = id ? `/api/host/vans/${id}` : "/api/host/vans";
  const res = await fetch(url);
  if (!res.ok) {
    throw {
      message: "Failed to fetch vans",
      statusText: res.statusText,
      status: res.status,
    };
  }
  const data = await res.json();
  return data.vans;
} */

/* export async function loginUser(creds) {
  const res = await fetch("/api/login", {
    method: "post",
    body: JSON.stringify(creds),
  });
  const data = await res.json();

  if (!res.ok) {
    throw {
      message: data.message,
      statusText: res.statusText,
      status: res.status,
    };
  }

  return data;
} */
