import * as Yup from "yup";

export const eventFormValidationSchema = Yup.object({
  title: Yup.string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be less than 100 characters")
    .required("Title required"),
  description: Yup.string()
    .min(5, "Description must be minimum of 5 characters")
    .max(500, "Description must be less than 500 characters")
    .required("Description Required"),
  isOnline: Yup.boolean(),
  location: Yup.string()
    .min(3, "Location must be minimum of 3 characters")
    .max(300, "Location must be less than 300 characters")
    .when("isOnline", (isOnline, schema) => {
      return isOnline[0] === false
        ? schema.required("Location is required for offline events")
        : schema;
    }),

  imageUrl: Yup.string().required("Require a Poster"),
  startDateTime: Yup.date().required("Schedule starting date"),
  endDateTime: Yup.date()
    .required("Schedule ending date is required")
    .test(
      'is-greater',
      'End date must be later than start date',
      function(value) {
        const { startDateTime } = this.parent;
        return value > startDateTime;  
      }
    ),
  categoryId: Yup.string(),
  isFree: Yup.boolean(),
  price: Yup.string()
    .nullable()
    .matches(/^[0-9]*$/, "Price must be a number")
    .when("isFree", (isFree, schema) => {
      return isFree[0] === false
        ? schema.required("Set price if not free")
        : schema;
    }),

  url: Yup.string()
    .url()
    .when("isOnline", (isOnline, schema) => {
      return isOnline[0] === true
        ? schema.required("Add a online event Url")
        : schema;
    }),
});

export const addNewCategoryForm = Yup.object({
  category: Yup.string().required("Enter a category to add"),
});
