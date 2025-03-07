import { generateFieldKey } from "@/core";
import { Field, FieldWithId, Form } from "@/core/types";
import { create } from "zustand";

const emptyForm: Form = {
  metadata: {
    heading: "My New Form",
    description:
      "I built this form with formcn, shadcn/ui, React Hook Form and Zod.",
    submitButton: "Submit",
    showBackground: true,
    backgroundColor: "amber",
    backgroundShade: 500,
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
  setForm: (form: Form) => void;
  setFields: (fields: FieldWithId[]) => void;
  setField: (id: number, field: FieldWithId) => void;
  setBackground: ({ color, shade }: { color: string; shade: number }) => void;
  setShowBackground: (showBackground: boolean) => void;
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
            key: generateFieldKey(state.nextFieldId),
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
  setForm: (form: Form) => set({ form }),
  setFields: (fields: FieldWithId[]) =>
    set((state) => ({ form: { ...state.form, fields } })),
  setField: (id: number, field: FieldWithId) =>
    set((state) => ({
      form: {
        ...state.form,
        fields: state.form.fields.map((f) => (f.id === id ? field : f)),
      },
    })),
  setBackground: ({ color, shade }: { color: string; shade: number }) =>
    set((state) => ({
      form: {
        ...state.form,
        metadata: {
          ...state.form.metadata,
          backgroundColor: color,
          backgroundShade: shade,
        },
      },
    })),
  setShowBackground: (showBackground: boolean) =>
    set((state) => ({
      form: {
        ...state.form,
        metadata: { ...state.form.metadata, showBackground },
      },
    })),
}));
