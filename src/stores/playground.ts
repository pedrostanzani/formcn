import { Field, Form } from "@/core/types";
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
            id: state.nextFieldId,
            ...field,
          },
        ],
      },
    })),
}));
