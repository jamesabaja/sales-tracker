import * as Yup from "yup"
import moment from "moment"

const yearNow = new Date(Date.now()).getFullYear()
const dateNow = new Date(Date.now()).getDate()
const monthNow = moment().format("MMM")

const REQUIRED_MESSAGE = "This field is required"
const VALID_AMOUNT_MESSAGE = "Please input a valid amount"
const VALID_YEAR_MESSAGE = "Please input a valid year"

export const initialValues = {
  amount: "",
  salesDate: {
    month: {
      value: monthNow,
      label: monthNow,
    },
    date: {
      value: dateNow,
      label: dateNow,
    },
    year: yearNow,
  },
  store: {
    label: "",
    value: "",
  },
}

export const validationSchema = Yup.object().shape({
  amount: Yup.number()
    .min(1, VALID_AMOUNT_MESSAGE)
    .required(REQUIRED_MESSAGE),
  store: Yup.object().shape({
    value: Yup.string().required(REQUIRED_MESSAGE),
  }),
  salesDate: Yup.object().shape({
    month: Yup.object().shape({
      value: Yup.string().required(REQUIRED_MESSAGE),
    }),
    date: Yup.object().shape({
      value: Yup.string().required(REQUIRED_MESSAGE),
    }),
    year: Yup.number()
      .min(1900, VALID_YEAR_MESSAGE)
      .max(yearNow, VALID_YEAR_MESSAGE)
      .required("This field is required"),
  }),
})
