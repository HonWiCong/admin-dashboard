import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import type { FirebaseApp } from 'firebase/app';
import type { Firestore } from 'firebase/firestore';
import type { Auth } from 'firebase/auth';
import { browser } from '$app/environment';

export let db: Firestore;
export let app: FirebaseApp;
export let auth: Auth;

const firebaseConfig = {
	apiKey: "AIzaSyBVuku3tSHOukKGsYldJ64QUuFcNwBEEtQ",
	authDomain: "iotwebdashboard.firebaseapp.com",
	projectId: "iotwebdashboard",
	storageBucket: "iotwebdashboard.appspot.com",
	messagingSenderId: "353048109673",
	appId: "1:353048109673:web:eef14d2e33b328bb9cf8f8"
};

export const initializeFirebase = () => {
	if (!browser) {
		throw new Error("Can't use the Firebase client on the server.");
	}
	if (!app) {
		app = initializeApp(firebaseConfig);
		auth = getAuth(app);
	}
};