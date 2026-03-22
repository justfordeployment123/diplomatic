export type FieldType =
  | 'text'
  | 'textarea'
  | 'select'
  | 'multi-select'
  | 'multilist'
  | 'date'
  | 'time'
  | 'toggle'
  | 'conditional'
  | 'number';

export interface FieldConfig {
  id: string;
  type: FieldType;
  label: string;
  required?: boolean;
  placeholder?: string;
  rows?: number;           // textarea
  mono?: boolean;          // text — monospace style (ref numbers, IDs)
  options?: string[];      // select, multi-select
  min?: number;            // number
  max?: number;            // number
  /** For 'conditional': which toggle field ID controls visibility */
  controlledBy?: string;
  /** For 'conditional': which value of the toggle field shows this field */
  showWhen?: boolean;
  /** For 'conditional': the child field rendered when condition is true */
  childField?: FieldConfig;
}

export interface SectionConfig {
  id: string;
  title: string;
  fields: FieldConfig[];
  collapsible?: boolean;
  defaultCollapsed?: boolean;
}

export interface GeneratorConfig {
  id: string;
  title: string;
  description: string;
  icon: string;             // Lucide icon name
  sections: SectionConfig[];
  confidentialFields: string[];
}
