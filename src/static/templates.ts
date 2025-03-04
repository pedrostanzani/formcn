import {
  Form,
  StringFieldFormat,
  EnumFieldFormat,
  BooleanFieldFormat,
  FieldType,
} from "@/core/types";

export const birthdayRSVPForm: Form = {
  metadata: {
    heading: "Birthday RSVP",
    description: "Please fill out the form to RSVP for the birthday party.",
    submitButton: "Submit",
    showBackground: true,
    backgroundColor: "red",
    backgroundShade: 500,
  },
  fields: [
    {
      id: 1,
      type: FieldType.String,
      format: StringFieldFormat.Input,
      label: "Name",
      placeholder: "Enter your full name",
      required: true,
    },
    {
      id: 2,
      type: FieldType.String,
      format: StringFieldFormat.Email,
      label: "Email",
      placeholder: "Enter your email address",
      required: true,
    },
    {
      id: 3,
      type: FieldType.String,
      format: StringFieldFormat.Input,
      label: "Phone Number",
      placeholder: "Enter your phone number",
      required: true,
    },
    {
      id: 4,
      type: FieldType.Enum,
      format: EnumFieldFormat.Select,
      label: "Meal Choice",
      placeholder: "Select your meal",
      options: [
        { label: "Chicken", value: "chicken" },
        { label: "Beef", value: "beef" },
        { label: "Vegetarian", value: "vegetarian" },
      ],
    },
    {
      id: 5,
      type: FieldType.Boolean,
      format: BooleanFieldFormat.Checkbox,
      label: "Will you attend?",
      description: "Check if you will attend the birthday party",
      asCard: false,
    },
    {
      id: 6,
      type: FieldType.Boolean,
      format: BooleanFieldFormat.Checkbox,
      label: "Bringing a plus one?",
      description: "Check if you are bringing a plus one",
      asCard: false,
    },
  ],
};
