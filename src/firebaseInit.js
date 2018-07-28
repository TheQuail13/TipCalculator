import firebase from 'firebase'
import 'firebase/firestore'
import firebaseConfig from './secrets.js'

const firebaseApp = firebase.initializeApp(firebaseConfig.config)
const settings = { timestampsInSnapshots: true };
firebaseApp.firestore().settings(settings);

export default firebaseApp.firestore()