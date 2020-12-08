import * as Yup from "yup"

const REQUIRED_MESSAGE = "This field is required"

export const initialValues = {
  name: "",
  category: {
    value: "",
  },
}

export const validationSchema = Yup.object().shape({
  name: Yup.string().required(REQUIRED_MESSAGE),
  category: Yup.object().shape({
    value: Yup.string().required(REQUIRED_MESSAGE),
  }),
})

export const storeCategoryOptions = [
  { value: "General Merchandise", label: "General Merchandise" },
  { value: "School Supplies", label: "School Supplies" },
  { value: "Food and Drink", label: "Food and Drink" },
]
