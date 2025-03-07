export enum StringFieldFormat {
  Input = "input",
  Textarea = "textarea",
  Email = "email",
  Password = "password",
}

export enum EnumFieldFormat {
  Select = "select",
  Combobox = "combobox",
  Radio = "radio",
}

export enum BooleanFieldFormat {
  Checkbox = "checkbox",
  Switch = "switch",
}

export enum NumberFieldFormat {
  Slider = "slider",
  Input = "input",
}

export enum DateFieldFormat {
  Individual = "individual",
  Range = "range",
}

export type FieldFormat =
  | StringFieldFormat
  | EnumFieldFormat
  | BooleanFieldFormat
  | NumberFieldFormat
  | DateFieldFormat;

export enum FieldType {
  String = "string",
  Enum = "enum",
  Boolean = "boolean",
  Number = "number",
  Date = "date",
}

export type StringField = {
  type: FieldType.String;
  format: StringFieldFormat;
  label?: string;
  placeholder?: string;
  required: boolean;
};

export type EnumField = {
  type: FieldType.Enum;
  format: EnumFieldFormat;
  label?: string;
  placeholder?: string;
  options: {
    label: string;
    value: string;
  }[];
};

export type BooleanField = {
  type: FieldType.Boolean;
  format: BooleanFieldFormat;
  label?: string;
  description?: string;
  asCard: boolean;
};

export type NumberField = {
  type: FieldType.Number;
  format: NumberFieldFormat;
  label?: string;
  placeholder?: string;
  required: boolean;
  min?: number;
  max?: number;
  step?: number;
};

export type DateField = {
  type: FieldType.Date;
  format: DateFieldFormat;
  label?: string;
  required: boolean;
  pastEnabled: boolean;
  futureEnabled: boolean;
};

export type Field =
  | StringField
  | EnumField
  | BooleanField
  | NumberField
  | DateField;

export type WithIdAndKey<T> = T & { id: number; key: string };

export type FieldWithId = WithIdAndKey<Field>;

export type FormMetadata = {
  heading: string;
  description: string;
  submitButton: string;
  showBackground: boolean;
  backgroundColor: string;
  backgroundShade: number;
}

export type Form = {
  metadata: FormMetadata;
  fields: FieldWithId[];
};
