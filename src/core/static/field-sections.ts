import {
  CaseLower,
  Text,
  AtSign,
  RectangleEllipsis,
  ListCheck,
  Component,
  CircleDot,
  SquareCheck,
  ToggleRight,
  Binary,
  SlidersHorizontal,
  Calendar1,
  CalendarDays,
  LucideIcon,
  LetterText,
  Calendar,
} from "lucide-react";

import {
  Field,
  FieldType,
  StringFieldFormat,
  EnumFieldFormat,
  BooleanFieldFormat,
  NumberFieldFormat,
  DateFieldFormat,
} from "@/core/types";

export type FieldOption = {
  title: string;
  description: string;
  type: string;
  format: string;
  icon: LucideIcon;
  fieldToAdd: Field;
};

export const fieldSections: {
  type: FieldType;
  sectionName: string;
  accentBackground: string;
  fields: FieldOption[];
  icon: LucideIcon;
}[] = [
  {
    type: FieldType.String,
    sectionName: "String fields",
    accentBackground: "bg-blue-600",
    icon: LetterText,
    fields: [
      {
        title: "Text Input",
        description: "Single-line text input field",
        type: FieldType.String,
        format: "input",
        icon: CaseLower,
        fieldToAdd: {
          type: FieldType.String,
          format: StringFieldFormat.Input,
          label: "My string field",
          placeholder: "Insert placeholder here...",
          required: true,
        },
      },
      {
        title: "Text Area",
        description: "Multi-line text input field",
        type: FieldType.String,
        format: "textarea",
        icon: Text,
        fieldToAdd: {
          type: FieldType.String,
          format: StringFieldFormat.Textarea,
          label: "My string field",
          placeholder: "Insert placeholder here...",
          required: true,
        },
      },
      {
        title: "Email",
        description: "Input field for email addresses",
        type: FieldType.String,
        format: StringFieldFormat.Email,
        icon: AtSign,
        fieldToAdd: {
          type: FieldType.String,
          format: StringFieldFormat.Email,
          label: "My string field",
          placeholder: "Insert placeholder here...",
          required: true,
        },
      },
      {
        title: "Password",
        description: "Secure input field for passwords",
        type: FieldType.String,
        format: StringFieldFormat.Password,
        icon: RectangleEllipsis,
        fieldToAdd: {
          type: FieldType.String,
          format: StringFieldFormat.Password,
          label: "My string field",
          placeholder: "Insert placeholder here...",
          required: true,
        },
      },
    ],
  },
  {
    type: FieldType.Enum,
    sectionName: "Enum fields",
    accentBackground: "bg-green-600",
    icon: ListCheck,
    fields: [
      {
        title: "Select",
        description: "Dropdown selection from a list of options",
        type: FieldType.Enum,
        format: EnumFieldFormat.Select,
        icon: ListCheck,
        fieldToAdd: {
          type: FieldType.Enum,
          format: EnumFieldFormat.Select,
          label: "My enum field",
          placeholder: "Select an option from the enum...",
          options: [
            { label: "Apple", value: "apple" },
            { label: "Banana", value: "banana" },
            { label: "Orange", value: "orange" },
          ],
        },
      },
      {
        title: "Combobox",
        description: "Searchable dropdown with options",
        type: FieldType.Enum,
        format: EnumFieldFormat.Combobox,
        icon: Component,
        fieldToAdd: {
          type: FieldType.Enum,
          format: EnumFieldFormat.Combobox,
          label: "My enum field",
          placeholder: "Select an option from the enum...",
          options: [
            { label: "Apple", value: "apple" },
            { label: "Banana", value: "banana" },
            { label: "Orange", value: "orange" },
          ],
        },
      },
      {
        title: "Radio Group",
        description: "Select one option from a list of radio buttons",
        type: FieldType.Enum,
        format: EnumFieldFormat.Radio,
        icon: CircleDot,
        fieldToAdd: {
          type: FieldType.Enum,
          format: EnumFieldFormat.Radio,
          label: "My enum field",
          placeholder: "Select an option from the enum...",
          options: [
            { label: "Apple", value: "apple" },
            { label: "Banana", value: "banana" },
            { label: "Orange", value: "orange" },
          ],
        },
      },
    ],
  },
  {
    type: FieldType.Boolean,
    sectionName: "Boolean fields",
    accentBackground: "bg-red-600",
    icon: ToggleRight,
    fields: [
      {
        title: "Checkbox",
        description: "Toggle between true and false with a checkbox",
        type: FieldType.Boolean,
        format: BooleanFieldFormat.Checkbox,
        icon: SquareCheck,
        fieldToAdd: {
          type: FieldType.Boolean,
          format: BooleanFieldFormat.Checkbox,
          label: "My boolean field",
          required: true,
        },
      },
      {
        title: "Switch",
        description: "Toggle between true and false with a switch",
        type: FieldType.Boolean,
        format: BooleanFieldFormat.Switch,
        icon: ToggleRight,
        fieldToAdd: {
          type: FieldType.Boolean,
          format: BooleanFieldFormat.Switch,
          label: "My boolean field",
          required: true,
        },
      },
    ],
  },
  {
    type: FieldType.Number,
    sectionName: "Number fields",
    accentBackground: "bg-yellow-600",
    icon: Binary,
    fields: [
      {
        title: "Number Input",
        description: "Input field for numeric values",
        type: FieldType.Number,
        format: NumberFieldFormat.Input,
        icon: Binary,
        fieldToAdd: {
          type: FieldType.Number,
          format: NumberFieldFormat.Input,
          label: "My number field",
          required: true,
        },
      },
      {
        title: "Slider",
        description: "Select a number using a slider",
        type: FieldType.Number,
        format: NumberFieldFormat.Slider,
        icon: SlidersHorizontal,
        fieldToAdd: {
          type: FieldType.Number,
          format: NumberFieldFormat.Slider,
          label: "My number field",
          required: true,
        },
      },
    ],
  },
  {
    type: FieldType.Date,
    sectionName: "Date fields",
    accentBackground: "bg-purple-600",
    icon: Calendar,
    fields: [
      {
        title: "Individual Date Picker",
        description: "Select a single date from a calendar",
        type: FieldType.Date,
        format: DateFieldFormat.Individual,
        icon: Calendar1,
        fieldToAdd: {
          type: FieldType.Date,
          format: DateFieldFormat.Individual,
          label: "My date field",
          required: true,
          pastEnabled: true,
          futureEnabled: true,
        },
      },
      {
        title: "Date Range Picker",
        description: "Select a range of dates from a calendar",
        type: FieldType.Date,
        format: DateFieldFormat.Range,
        icon: CalendarDays,
        fieldToAdd: {
          type: FieldType.Date,
          format: DateFieldFormat.Range,
          label: "My date field",
          required: true,
          pastEnabled: true,
          futureEnabled: true,
        },
      },
    ],
  },
];
