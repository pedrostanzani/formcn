export type StringField = {
  type: "string";
  format: "input" | "textarea" | "email" | "password";
  label?: string;
  placeholder?: string;
  required: boolean;
};

export type EnumField = {
  type: "enum";
  format: "select" | "combobox" | "radio";
  label?: string;
  placeholder?: string;
  options: {
    label: string;
    value: string;
  }[];
};

export type BooleanField = {
  type: "boolean";
  format: "checkbox" | "switch";
  label?: string;
  required: boolean;
};

export type NumberField = {
  type: "number";
  format: "slider" | "input";
  label?: string;
  placeholder?: string;
  required: boolean;
  min?: number;
  max?: number;
  step?: number;
};

export type DateField = {
  type: "date";
  format: "individual" | "range";
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

type FieldWithId = Field & {
  id: number;
};

export type Form = {
  metadata: {
    heading: string;
    description: string;
    submitButton: string;
  };

  fields: FieldWithId[];
};
