import { Field, FieldWithId, Form } from "@/core/types";
import { create } from "zustand";

const emptyForm: Form = {
  metadata: {
    heading: "",
    description: "",
    submitButton: "",
  },
  fields: [],
};

interface PlaygroundState {
  currentTab: "form" | "code";
  setCurrentTab: (currentTab: "form" | "code") => void;

  form: Form;
  nextFieldId: number;
  addField: (field: Field) => void;
  removeField: (id: number) => void;
  setFields: (fields: FieldWithId[]) => void;
  setField: (id: number, field: FieldWithId) => void;
}

export const usePlaygroundStore = create<PlaygroundState>()((set) => ({
  currentTab: "form",
  setCurrentTab: (currentTab) => set({ currentTab }),

  // Form state and utilities
  form: emptyForm,
  nextFieldId: 0,
  addField: (field: Field) =>
    set((state) => ({
      nextFieldId: state.nextFieldId + 1,
      form: {
        ...state.form,
        fields: [
          ...state.form.fields,
          {
            ...field,
            id: state.nextFieldId,
          },
        ],
      },
    })),
  removeField: (id: number) =>
    set((state) => ({
      form: {
        ...state.form,
        fields: state.form.fields.filter((field) => field.id !== id),
      },
    })),
  setFields: (fields: FieldWithId[]) =>
    set((state) => ({ form: { ...state.form, fields } })),
  setField: (id: number, field: FieldWithId) =>
    set((state) => ({
      form: {
        ...state.form,
        fields: state.form.fields.map((f) => (f.id === id ? field : f)),
      },
    })),
}));
