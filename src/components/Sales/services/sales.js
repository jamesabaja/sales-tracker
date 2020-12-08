import firebase from "firebase"
import { initialValues } from "../utils/salesFormSchema"

const ADD_SALES = "add"

export const getSales = async () => {
  const querySales = await firebase
    .firestore()
    .collection("sales")
    .get()

  let allSales = []
  querySales.forEach(store => {
    allSales = [...allSales, { ...store.data(), id: store.id }]
  })

  return allSales
}

export const addSales = async ({ values, callback }) => {
  let salesDocument = {
    amount: values?.amount,
    store: values?.store?.id,
    salesDate: {
      month: values?.salesDate?.month?.value,
      date: values?.salesDate?.date?.value,
      year: values?.salesDate?.year,
    },
    createdDate: new Date(Date.now()),
  }

  await firebase
    .firestore()
    .collection("sales")
    .add(salesDocument)
    .then(() => {
      if (callback) callback()
    })
}

export const editSales = async ({ values, callback }) => {
  let salesDocument = {
    amount: values?.amount,
    store: values?.store?.id,
    salesDate: {
      month: values?.salesDate?.month?.value,
      date: values?.salesDate?.date?.value,
      year: values?.salesDate?.year,
    },
  }

  await firebase
    .firestore()
    .collection("sales")
    .doc(values?.id)
    .update(salesDocument)
    .then(() => {
      if (callback) callback()
    })
}

export const getInitialFormValues = ({ type, selectedStore, sale }) => {
  if (type === ADD_SALES)
    return {
      ...initialValues,
      store: selectedStore?.id ? selectedStore : initialValues?.store,
    }
  return {
    ...sale,
    store: selectedStore,
    salesDate: {
      month: {
        value: sale?.salesDate?.month,
        label: sale?.salesDate?.month,
      },
      date: {
        value: sale?.salesDate?.date,
        label: sale?.salesDate?.date,
      },
      year: sale?.salesDate?.year,
    },
  }
}
