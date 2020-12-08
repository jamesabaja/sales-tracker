import firebase from "firebase"

export const getStores = async () => {
  const queryStores = await firebase
    .firestore()
    .collection("stores")
    .get()

  let allStores = []
  queryStores.forEach(store => {
    allStores = [...allStores, { ...store.data(), id: store.id }]
  })

  return allStores
}

export const addStore = async ({ values, callback }) => {
  let storeDocument = {
    ...values,
    category: values?.category?.value,
  }

  await firebase
    .firestore()
    .collection("stores")
    .add(storeDocument)
    .then(() => {
      if (callback) callback()
    })
}

export const editStore = async ({ values, callback }) => {
  let storeDocument = {
    name: values?.name,
    category: values?.category?.value,
  }

  await firebase
    .firestore()
    .collection("stores")
    .doc(values?.id)
    .update(storeDocument)
    .then(() => {
      if (callback) callback()
    })
}
