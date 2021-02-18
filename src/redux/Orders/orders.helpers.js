import { firestore } from "../../firebase/utils";

export const handleSaveOrderHistory = (order) => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("orders")
      .doc()
      .set(order)
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const handleGetUserOrderHistory = (uid) => {
  return new Promise((resolve, reject) => {
    let ref = firestore.collection("orders").orderBy("orderCreatedDate");

    ref = ref.where("orderUserID", "==", uid);

    ref
      .get()
      .then((snapshot) => {
        const data = [
          ...snapshot.docs.map((doc) => {
            return {
              ...doc.data(),
              documentID: doc.id,
            };
          }),
        ];

        resolve({ data });
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const handleGetOrderDetails = (orderID) => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("orders")
      .doc(orderID)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          resolve({
            ...snapshot.data(),
            documentID: orderID,
          });
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};
