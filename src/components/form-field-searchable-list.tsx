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

type FieldOption = {
  title: string;
  description: string;
  type: string;
  format: string;
  icon: LucideIcon;
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
      },
      {
        title: "Text Area",
        description: "Multi-line text input field",
        type: "string",
        format: "textarea",
        icon: Text,
      },
      {
        title: "Email",
        description: "Input field for email addresses",
        type: "string",
        format: "email",
        icon: AtSign,
      },
      {
        title: "Password",
        description: "Secure input field for passwords",
        type: "string",
        format: "password",
        icon: RectangleEllipsis,
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
      },
      {
        title: "Combobox",
        description: "Searchable dropdown with options",
        type: "enum",
        format: "combobox",
        icon: Component,
      },
      {
        title: "Radio Group",
        description: "Select one option from a list of radio buttons",
        type: "enum",
        format: "radio",
        icon: CircleDot,
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
      },
      {
        title: "Switch",
        description: "Toggle between true and false with a switch",
        type: "boolean",
        format: "switch",
        icon: ToggleRight,
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
      },
      {
        title: "Slider",
        description: "Select a number using a slider",
        type: "number",
        format: "slider",
        icon: SlidersHorizontal,
      },
    ],
  },
  {
    type: "date",
    sectionName: "Date fields",
    accentBackground: "bg-purple-600",
    fields: [
      {
        title: "Date Picker",
        description: "Select a single date from a calendar",
        type: "date",
        format: "individual",
        icon: Calendar1,
      },
      {
        title: "Date Range Picker",
        description: "Select a range of dates from a calendar",
        type: "date",
        format: "range",
        icon: CalendarDays,
      },
    ],
  },
];

export function FormFieldSearchableList() {
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
      <div className="top-0 flex md:px-6 flex-col gap-3 bg-white md:flex-row">
        <div className="px-6 md:px-0 w-full md:order-2">
          <div className="relative w-full">
            <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-zinc-500" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 md:order-1 md:max-w-sm"
              type="text"
              placeholder="Search for a field type..."
            />
          </div>
        </div>
        <div className="mb-7 flex gap-2 overflow-x-scroll md:overflow-x-visible">
          <div className="flex pl-6 last:pr-6 md:pl-0 md:last:pr-0 gap-2" key="filter-types">
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
                  field.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  field.description.toLowerCase().includes(searchQuery.toLowerCase())
              ),
          )
          .map((fieldSection) => (
            <div key={fieldSection.type}>
              <div className="mb-4 flex items-center gap-2 px-6">
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
              <div className="flex gap-2 overflow-x-scroll pl-6 last:pr-4">
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
                field.description.toLowerCase().includes(searchQuery.toLowerCase())
            ),
        ).length === 0 && (
          <div className="flex flex-col justify-center items-center gap-5 h-full text-zinc-500">
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
}: {
  icon: LucideIcon;
  accentBackground: string;
  title: string;
  description: string;
}) => {
  return (
    <button className="group flex max-w-52 shrink-0 cursor-pointer flex-col overflow-hidden rounded-md border border-zinc-200 transition-all">
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
