import {
  collection,
  doc,
  updateDoc,
  getDocs,
  query,
  serverTimestamp,
  addDoc,
  where,
  deleteDoc,
  Timestamp,
} from "firebase/firestore";
import admin from "../firebase/firebase-admin.js";
import { db } from "../firebase/firebase.js";
import * as group from 'groupbytime'

export const createShorten = async (req, token) => {
  try {
    if (!req.alias) {
      req.alias = makeid(8);
    } else {
      const q = query(
        collection(db, "shorten"),
        where("alias", "==", req.alias)
      );
      const _res = await getDocs(q);
      // const url = await getDoc(doc(db, "shorten"));
      if (!_res.empty) {
        let httpException = new Error("Alias has been taken");
        httpException.stack = 400;
        throw httpException;
      }
    }

    const parsedToken = token.split(" ")[1];
    const userId = await admin
      .auth()
      .verifyIdToken(parsedToken)
      .then((res) => res.uid);

    const _res = await addDoc(collection(db, "shorten"), {
      ...req,
      count: 0,
      userId: userId,
      timestamp: serverTimestamp(),
      clickTimestamp: []
    }).then(() => req);

    return _res;
  } catch (err) {
    let httpException = new Error(err.message);
    httpException.stack = 400;
    throw httpException;
  }
};

export const redirectShorten = async (alias) => {
  try {
    const q = query(collection(db, "shorten"), where("alias", "==", alias));
    let docSnap = {};
    let docId = "";
    const _res = await getDocs(q);
    _res.forEach((data) => {
      docSnap = data.data();
      docId = data.id;
    });


    const time = Timestamp.now()

    docSnap.clickTimestamp.push(time)
    console.log(docSnap);
    // const docSnap = await getDoc(doc(db, "shorten", alias));
    const url = await updateDoc(doc(db, "shorten", docId), {
      count: docSnap.count + 1,
      clickTimestamp: docSnap.clickTimestamp
    }).then(() => {
      return docSnap.url;
    });
    return url;
  } catch (err) {
    let httpException = new Error(err.message);
    httpException.stack = 400;
    throw httpException;
  }
};

export const getUrlbyAlias = async (alias) => {
  try {
    const q = query(collection(db, "shorten"), where("alias", "==", alias));
    const _res = await getDocs(q);
    let docSnap = {};
    let times = []
    let d = Timestamp.now().seconds
    let date = new Date(d1000)
    date.setHours(date.getHours() + Math.round(date.getMinutes()/60));
    date.setMinutes(0, 0, 0);
    let today = date.getTime()/1000
    let roundMidnight = (new Date(d1000).setHours(24,0,0,0))/1000
    console.log(roundMidnight);
    _res.forEach((data) => {
      data.data().clickTimestamp.forEach(time => {
        times.push({
          data : "data",
          ts: time.seconds
        })
      })
      const parsed = JSON.stringify(times)
      console.log(parsed);
      console.log(JSON.parse(parsed));
      const enamjam = 21600;
      const tigahari = 259200;
    
      const groupHours = group.groupBy(JSON.parse(parsed), today-enamjam, today , "ts", 60*60)
      console.log(groupHours);
      const parsedGroupHours = []
      Object.keys(groupHours).forEach(key => {
        if(groupHours[key].length){
          const jam = new Date(parseInt(key * 1000)).getHours()
          const selisih = jam+":00 - " + (parseInt(jam)+1) + ":00"
          parsedGroupHours.push({
            time : selisih,
            count : groupHours[key].length
          })
        }
      })

      const parsedgroupDay = []
      console.log(roundMidnight);
      console.log(today);
      const groupDay = group.groupBy(JSON.parse(parsed), roundMidnight-tigahari, roundMidnight , "ts", 60*1440)
      console.log(groupDay);
      Object.keys(groupDay).forEach(key => {
        if(groupDay[key].length){
          const date = new Date(parseInt(key * 1000)).toDateString()
          parsedgroupDay.push({
            date : date,
            count : groupDay[key].length
          })
        }
      })

      console.log(parsedGroupHours);
      console.log(parsedgroupDay);

      

      docSnap = {
        ...data.data(),
        id: data.id,
        countClick : {
          groupByDay : parsedgroupDay,
          groupByHour : parsedGroupHours
        }
      };
    });
    delete docSnap.clickTimestamp
    console.log(docSnap);
    return docSnap;
  } catch (err) {
    let httpException = new Error(err.message);
    httpException.stack = 400;
    throw httpException;
  }
};

export const getShorten = async (req) => {
  try {
    const token = req.headers.authorization;
    const parsedToken = token.split(" ")[1];
    const userId = await admin
      .auth()
      .verifyIdToken(parsedToken)
      .then((res) => res.uid);
    const q = query(collection(db, "shorten"), where("userId", "==", userId));
    const _res = await getDocs(q);
    let urls = [];
    _res.forEach((doc) => {
      urls.push({
        ...doc.data(),
        id: doc.id,
      });
    });
    return urls;
  } catch (err) {
    let httpException = new Error(err.message);
    httpException.stack = 400;
    throw httpException;
  }
};

function makeid(length) {
  try {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
} catch (err) {
  let httpException = new Error(err.message);
  httpException.stack = 400;
  throw httpException;
}
}
export const deleteShorten = async (id, req) => {
  try{
    const token = req.headers.authorization;
    const parsedToken = token.split(" ")[1];
    const userId = await admin
      .auth()
      .verifyIdToken(parsedToken)
      .then((res) => res.uid);

      console.log(id, userId);
    const _res = await deleteDoc(doc(db, "shorten", id), where("userId", "==", userId)).catch(err => (console.log(err)));
    if(_res)
      return true;
  } catch (err) {
    let httpException = new Error(err.message);
    httpException.stack = 400;
    throw httpException;
  }
}; 

export const updateShorten = async (req, id) => {
  try{
    if (!req.alias) {
      req.alias = makeid(8);
    } else {
      const q = query(
        collection(db, "shorten"),
        where("alias", "==", req.alias)
      );
      const _res = await getDocs(q);
      let flag = true;
      _res.forEach((data) => {
        if (data.data().alias == req.alias && data.id != id) flag = false;
      });
      if (!flag) {
        let httpException = new Error("Alias has been taken");
        httpException.stack = 400;
        throw httpException;
      }
      
      const resUp = await updateDoc(doc(db, "shorten", id), req).then(() => true)
      console.log(resUp);
      return resUp;
    }
  } catch (err) {
    let httpException = new Error(err.message);
    httpException.stack = 400;
    throw httpException;
  }
};
