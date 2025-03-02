type StringField = {
  id: number;
  type: "string";
  format: "input" | "textarea" | "email" | "password";
  label?: string;
  placeholder?: string;
  required: boolean;
};

type EnumField = {
  id: number;
  type: "enum";
  format: "select" | "combobox" | "radio";
  label?: string;
  placeholder?: string;
  options: {
    label: string;
    value: string;
  }[];
};

type BooleanField = {
  id: number;
  type: "boolean";
  format: "checkbox" | "switch";
  label?: string;
  required: boolean;
};

type NumberField = {
  id: number;
  type: "number";
  format: "slider" | "input";
  label?: string;
  placeholder?: string;
  required: boolean;
  min?: number;
  max?: number;
  step?: number;
};

type DateField = {
  id: number;
  type: "date";
  format: "individual" | "range";
  label?: string;
  required: boolean;
  pastEnabled: boolean;
  futureEnabled: boolean;
};

type Field = StringField | EnumField | BooleanField | NumberField | DateField;

export type Form = {
  metadata: {
    heading: string;
    description: string;
    submitButton: string;
  };

  fields: Field[];
};
