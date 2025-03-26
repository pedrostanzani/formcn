import { generateFieldKey } from "@/core";
import { Field, FieldWithId, Form, FormMetadata } from "@/core/types";
import { create } from "zustand";

const emptyForm: Form = {
  metadata: {
    heading: "My New Form",
    description:
      "I built this form with formcn, shadcn/ui, React Hook Form and Zod.",
    submitButton: "Submit",
    submitButtonColor: "zinc",
    submitButtonShade: 900,
    buttonWidthFull: false,
    showBackground: true,
    backgroundColor: "amber",
    backgroundShade: 500,
  },
  fields: [],
};

interface PlaygroundState {
  // UI
  currentTab: "form" | "code";
  compactToolbar: boolean;
  backgroundDialogOpen: boolean;
  editHeadingDialogOpen: boolean;
  editSubmitButtonDialogOpen: boolean;
  payloadPreview: string | null;

  // UI setters
  setCurrentTab: (currentTab: "form" | "code") => void;
  setCompactToolbar: (compactToolbar: boolean) => void;
  setBackgroundDialogOpen: (backgroundDialogOpen: boolean) => void;
  setEditHeadingDialogOpen: (editHeadingDialogOpen: boolean) => void;
  setEditSubmitButtonDialogOpen: (editSubmitButtonDialogOpen: boolean) => void;
  setPayloadPreview: (payloadPreview: string | null) => void;

  // Form state
  form: Form;
  nextFieldId: number;

  // Form state setters
  setForm: (form: Form) => void;
  setNextFieldId: (nextFieldId: number) => void;
  resetForm: () => void;

  // Form utilities (fields)
  addField: (field: Field) => void;
  removeField: (id: number) => void;
  setField: (id: number, field: FieldWithId) => void;
  setFields: (fields: FieldWithId[]) => void;

  // Form utilities (metadata)
  setMetadata: (metadata: FormMetadata) => void;
  setBackground: ({ color, shade }: { color: string; shade: number }) => void;
  setShowBackground: (showBackground: boolean) => void;
}

export const usePlaygroundStore = create<PlaygroundState>()((set) => ({
  // Undo/redo
  // undoStack: [],
  // redoStack: [],

  // undo: () => {},
  // redo: () => {},

  // UI
  currentTab: "form",
  compactToolbar: false,
  backgroundDialogOpen: false,
  editHeadingDialogOpen: false,
  editSubmitButtonDialogOpen: false,
  payloadPreview: null,

  // UI setters
  setCurrentTab: (currentTab) => set({ currentTab }),
  setCompactToolbar: (compactToolbar) => set({ compactToolbar }),
  setBackgroundDialogOpen: (backgroundDialogOpen) =>
    set({ backgroundDialogOpen }),
  setEditHeadingDialogOpen: (editHeadingDialogOpen) =>
    set({ editHeadingDialogOpen }),
  setEditSubmitButtonDialogOpen: (editSubmitButtonDialogOpen) =>
    set({ editSubmitButtonDialogOpen }),
  setPayloadPreview: (payloadPreview: string | null) => set({ payloadPreview }),

  // Form state
  form: emptyForm,
  nextFieldId: 0,

  // Form state setters
  setForm: (form: Form) => set({ form }),
  setNextFieldId: (nextFieldId) => set({ nextFieldId }),
  resetForm: () => set({ form: emptyForm }),

  // Form utilities (fields)
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
  setField: (id: number, field: FieldWithId) =>
    set((state) => ({
      form: {
        ...state.form,
        fields: state.form.fields.map((f) => (f.id === id ? field : f)),
      },
    })),
  setFields: (fields: FieldWithId[]) =>
    set((state) => ({ form: { ...state.form, fields } })),

  // Form utilities (metadata)
  setMetadata: (metadata: FormMetadata) =>
    set((state) => ({ form: { ...state.form, metadata } })),
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
