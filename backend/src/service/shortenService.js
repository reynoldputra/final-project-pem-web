import { collection, doc, getDoc, updateDoc, getDocs, query, serverTimestamp, setDoc, where } from 'firebase/firestore'
import admin from '../firebase/firebase-admin.js'
import { db } from '../firebase/firebase.js'

export const createShorten = async (req, token) => {
    try {
        if(!req.alias){
            req.alias = makeid(8)
        } else {
            const url = await getDoc(doc(db, "shorten", req.alias))
            if(url.exists()) {
                let httpException = new Error("Alias has been taken")
                httpException.stack = 400
                throw httpException
            }
        }

        const parsedToken = token.split(' ')[1];
        const userId = await admin.auth().verifyIdToken(parsedToken).then((res) => res.uid)

        const _res = await setDoc(doc(db, "shorten", req.alias), {
            ...req,
            count : 0,
            userId : userId,
            timestamp : serverTimestamp()
        }).then(() => req)

        return _res;
    } catch (err) {
        let httpException = new Error(err.message)
        httpException.stack = 400
        throw httpException
}
}

export const redirectShorten = async (alias) => {
  try {
    const docSnap = await getDoc(doc(db, "shorten", alias));
    await updateDoc(doc(db, "shorten", req.alias),{
      count : docSnap.data().count++
    })
    return docSnap.data().url
  } catch (err) {
    let httpException = new Error(err.message);
    httpException.stack = 400;
    throw httpException;
  }
}; 

export const getShorten = async (req) => {
    try {
        const token = req.headers.authorization
        const parsedToken = token.split(' ')[1];
        const userId = await admin.auth().verifyIdToken(parsedToken).then((res) => res.uid)
        const q = query(collection(db, "shorten"), where("userId", "==", userId))
        const _res = await getDocs(q);
        let urls = {}
        _res.forEach((doc) => {
            const id = doc.id
            urls = {
                ...urls,
                id : doc.data()
            }
        })
        return urls
    } catch (err) {
        let httpException = new Error(err.message)
        httpException.stack = 400
        throw httpException
    }
}

function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
