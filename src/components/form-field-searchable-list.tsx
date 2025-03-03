"use client";

import { Input } from "@/components/ui/input";
import {
  Search,
  LetterText,
  CaseLower,
  LucideIcon,
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
  CircleOff,
} from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Field } from "@/core/types";
import { usePlaygroundStore } from "@/stores/playground";

type FieldOption = {
  title: string;
  description: string;
  type: string;
  format: string;
  icon: LucideIcon;
  fieldToAdd: Field;
};

const fieldTypes = ["string", "enum", "boolean", "number", "date"] as const;

const fieldSections: {
  type: (typeof fieldTypes)[number];
  sectionName: string;
  accentBackground: string;
  fields: FieldOption[];
}[] = [
  {
    type: "string",
    sectionName: "String fields",
    accentBackground: "bg-blue-600",
    fields: [
      {
        title: "Text Input",
        description: "Single-line text input field",
        type: "string",
        format: "input",
        icon: CaseLower,
        fieldToAdd: {
          type: "string",
          format: "input",
          label: "My string field",
          placeholder: "Insert placeholder here...",
          required: true,
        },
      },
      {
        title: "Text Area",
        description: "Multi-line text input field",
        type: "string",
        format: "textarea",
        icon: Text,
        fieldToAdd: {
          type: "string",
          format: "textarea",
          label: "My string field",
          placeholder: "Insert placeholder here...",
          required: true,
        },
      },
      {
        title: "Email",
        description: "Input field for email addresses",
        type: "string",
        format: "email",
        icon: AtSign,
        fieldToAdd: {
          type: "string",
          format: "email",
          label: "My string field",
          placeholder: "Insert placeholder here...",
          required: true,
        },
      },
      {
        title: "Password",
        description: "Secure input field for passwords",
        type: "string",
        format: "password",
        icon: RectangleEllipsis,
        fieldToAdd: {
          type: "string",
          format: "password",
          label: "My string field",
          placeholder: "Insert placeholder here...",
          required: true,
        },
      },
    ],
  },
  {
    type: "enum",
    sectionName: "Enum fields",
    accentBackground: "bg-green-600",
    fields: [
      {
        title: "Select",
        description: "Dropdown selection from a list of options",
        type: "enum",
        format: "select",
        icon: ListCheck,
        fieldToAdd: {
          type: "enum",
          format: "select",
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
        type: "enum",
        format: "combobox",
        icon: Component,
        fieldToAdd: {
          type: "enum",
          format: "combobox",
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
        type: "enum",
        format: "radio",
        icon: CircleDot,
        fieldToAdd: {
          type: "enum",
          format: "radio",
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
    type: "boolean",
    sectionName: "Boolean fields",
    accentBackground: "bg-red-600",
    fields: [
      {
        title: "Checkbox",
        description: "Toggle between true and false with a checkbox",
        type: "boolean",
        format: "checkbox",
        icon: SquareCheck,
        fieldToAdd: {
          type: "boolean",
          format: "checkbox",
          label: "My boolean field",
          required: true,
        },
      },
      {
        title: "Switch",
        description: "Toggle between true and false with a switch",
        type: "boolean",
        format: "switch",
        icon: ToggleRight,
        fieldToAdd: {
          type: "boolean",
          format: "switch",
          label: "My boolean field",
          required: true,
        },
      },
    ],
  },
  {
    type: "number",
    sectionName: "Number fields",
    accentBackground: "bg-yellow-600",
    fields: [
      {
        title: "Number Input",
        description: "Input field for numeric values",
        type: "number",
        format: "input",
        icon: Binary,
        fieldToAdd: {
          type: "number",
          format: "input",
          label: "My number field",
          required: true,
        },
      },
      {
        title: "Slider",
        description: "Select a number using a slider",
        type: "number",
        format: "slider",
        icon: SlidersHorizontal,
        fieldToAdd: {
          type: "number",
          format: "slider",
          label: "My number field",
          required: true,
        },
      },
    ],
  },
  {
    type: "date",
    sectionName: "Date fields",
    accentBackground: "bg-purple-600",
    fields: [
      {
        title: "Individual Date Picker",
        description: "Select a single date from a calendar",
        type: "date",
        format: "individual",
        icon: Calendar1,
        fieldToAdd: {
          type: "date",
          format: "individual",
          label: "My date field",
          required: true,
          pastEnabled: true,
          futureEnabled: true,
        },
      },
      {
        title: "Date Range Picker",
        description: "Select a range of dates from a calendar",
        type: "date",
        format: "range",
        icon: CalendarDays,
        fieldToAdd: {
          type: "date",
          format: "range",
          label: "My date field",
          required: true,
          pastEnabled: true,
          futureEnabled: true,
        },
      },
    ],
  },
];

export function FormFieldSearchableList({
  closeDialog,
}: {
  closeDialog: () => void;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<(typeof fieldTypes)[number][]>([]);

  const toggleFilter = (filter: (typeof fieldTypes)[number]) => {
    if (filters.includes(filter)) {
      setFilters((prev) => prev.filter((item) => item !== filter));
    } else {
      setFilters((prev) => [...prev, filter]);
    }
  };

  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:px-6">
        <div className="w-full px-4 md:order-2 md:px-0">
          <div className="relative w-full">
            <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-zinc-500" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 md:max-w-sm"
              type="text"
              placeholder="Search for a field type..."
            />
          </div>
        </div>
        <div className="flex gap-2 overflow-x-scroll pl-4 last:pr-4 md:order-1 md:overflow-x-visible md:pl-0 md:last:pr-0">
          <div className="flex gap-2" key="filter-types">
            {fieldTypes.map((fieldType) => (
              <Button
                key={fieldType}
                onClick={() => toggleFilter(fieldType)}
                variant="outline"
                className={cn(
                  "h-8.5 cursor-pointer font-medium tracking-tight transition-all",
                  filters.includes(fieldType) &&
                    "bg-amber-400 hover:bg-amber-400/90",
                )}
              >
                {fieldType.charAt(0).toUpperCase() + fieldType.slice(1)}
              </Button>
            ))}
          </div>
        </div>
      </div>
      <div className="flex-grow space-y-6 last:pb-6">
        {fieldSections
          .filter(
            (fieldSection) =>
              (filters.includes(fieldSection.type) || filters.length === 0) &&
              fieldSection.fields.some(
                (field) =>
                  field.title
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                  field.description
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()),
              ),
          )
          .map((fieldSection) => (
            <div key={fieldSection.type}>
              <div className="mb-4 flex items-center gap-2 px-4 md:px-6">
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-sm font-mono text-xs leading-none font-bold text-white select-none",
                    fieldSection.accentBackground,
                  )}
                >
                  <LetterText />
                </div>
                <h3 className="text-xl leading-none font-semibold tracking-tight">
                  {fieldSection.sectionName}
                </h3>
              </div>
              <div className="flex gap-2 overflow-x-scroll pl-4 last:pr-4 md:pl-6">
                {fieldSection.fields
                  .filter(
                    (field) =>
                      field.title
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                      field.description
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()),
                  )
                  .map((field) => (
                    <FieldTypeButton
                      key={`${fieldSection.type}-${field.format}`}
                      accentBackground={fieldSection.accentBackground}
                      title={field.title}
                      description={field.description}
                      icon={field.icon}
                      fieldToAdd={field.fieldToAdd}
                      closeDialog={closeDialog}
                    />
                  ))}
              </div>
            </div>
          ))}
        {fieldSections.filter(
          (fieldSection) =>
            (filters.includes(fieldSection.type) || filters.length === 0) &&
            fieldSection.fields.some(
              (field) =>
                field.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                field.description
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase()),
            ),
        ).length === 0 && (
          <div className="flex h-full flex-col items-center justify-center gap-5 text-zinc-500">
            <CircleOff className="size-10" />
            <p className="text-center tracking-tight">
              No matching fields found. Try a different search term.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

const FieldTypeButton = ({
  icon: Icon,
  accentBackground,
  title,
  description,
  fieldToAdd,
  closeDialog,
}: {
  icon: LucideIcon;
  accentBackground: string;
  title: string;
  description: string;
  fieldToAdd: Field;
  closeDialog: () => void;
}) => {
  const { addField } = usePlaygroundStore();

  return (
    <button
      onClick={() => {
        addField(fieldToAdd);
        closeDialog();
      }}
      className="group flex max-w-52 shrink-0 cursor-pointer flex-col overflow-hidden rounded-md border border-zinc-200 transition-all"
    >
      <div
        className={cn(
          "flex h-24 w-52 items-center justify-center transition-opacity group-hover:opacity-95",
          accentBackground,
        )}
      >
        <Icon className="size-6 text-zinc-50" />
      </div>
      <div className="flex flex-col p-2.5 pt-3 text-left transition-colors group-hover:bg-zinc-50">
        <span className="mb-1 text-sm leading-none font-medium">{title}</span>
        <span className="text-xs break-words text-zinc-500">{description}</span>
      </div>
    </button>
  );
};
