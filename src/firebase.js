import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyAvkIuNh3dYZF97XoRgejViAIWvnU38Kcg",
    authDomain: "reacttodo-92298.firebaseapp.com",
    databaseURL: "https://reacttodo-92298.firebaseio.com",
    projectId: "reacttodo-92298",
    storageBucket: "reacttodo-92298.appspot.com",
    messagingSenderId: "633454432944"
};
firebase.initializeApp(config);
export default firebase;