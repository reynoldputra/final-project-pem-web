import admin from 'firebase-admin'
import serviceAccount from './shorten-link-c4e5b-firebase-adminsdk-3a0um-717cd70fc0.json' assert { type: "json" }   

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export const db = admin.firestore()
export default admin;
