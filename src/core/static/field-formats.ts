import {
  BooleanFieldFormat,
  EnumFieldFormat,
  FieldType,
  NumberFieldFormat,
  StringFieldFormat,
  DateFieldFormat,
  FieldFormat,
} from "../types";

export const fieldFormats: {
  type: FieldType;
  formats: {
    format: FieldFormat;
    label: string;
  }[];
}[] = [
  {
    type: FieldType.String,
    formats: [
      { format: StringFieldFormat.Email, label: "Email" },
      { format: StringFieldFormat.Input, label: "Text input" },
      { format: StringFieldFormat.Password, label: "Password" },
      { format: StringFieldFormat.Textarea, label: "Textarea" },
    ],
  },
  {
    type: FieldType.Enum,
    formats: [
      { format: EnumFieldFormat.Select, label: "Select" },
      { format: EnumFieldFormat.Combobox, label: "Combobox" },
      { format: EnumFieldFormat.Radio, label: "Radio group" },
    ],
  },
  {
    type: FieldType.Boolean,
    formats: [
      { format: BooleanFieldFormat.Checkbox, label: "Checkbox" },
      { format: BooleanFieldFormat.Switch, label: "Switch" },
    ],
  },
  {
    type: FieldType.Number,
    formats: [
      { format: NumberFieldFormat.Input, label: "Numeric" },
      { format: NumberFieldFormat.Slider, label: "Slider" },
    ],
  },
  {
    type: FieldType.Date,
    formats: [
      { format: DateFieldFormat.Individual, label: "Individual date picker" },
      { format: DateFieldFormat.Range, label: "Date range picker" },
    ],
  },
];
