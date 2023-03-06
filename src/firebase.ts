import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

export const firebaseConfig = {
  apiKey: 'AIzaSyDm33D6XqaHj9cZ-klEuZrsBsIIEOtF8yI',
  authDomain: 'ng-course-recipe-book-c9839.firebaseapp.com',
  projectId: 'ng-course-recipe-book-c9839',
  storageBucket: 'ng-course-recipe-book-c9839.appspot.com',
  messagingSenderId: '378236432876',
  appId: '1:378236432876:web:874dd3a617b5f66344d0c9',
  databaseURL:
    'https://ng-course-recipe-book-c9839-default-rtdb.europe-west1.firebasedatabase.app',
};

export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
