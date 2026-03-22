import { create } from 'zustand';

interface GeneratorStore {
  formData: Record<string, unknown>;
  isConfidentialMode: boolean;
  isGenerating: boolean;
  generatedOutput: string;
  editedOutput: string | null;

  setFormData: (d: Record<string, unknown>) => void;
  toggleConfidentialMode: () => void;
  appendOutput: (chunk: string) => void;
  setOutput: (v: string) => void;
  setEditedOutput: (v: string) => void;
  clearOutput: () => void;
  setIsGenerating: (v: boolean) => void;
}

export const useGeneratorStore = create<GeneratorStore>((set) => ({
  formData: {},
  isConfidentialMode: false,
  isGenerating: false,
  generatedOutput: '',
  editedOutput: null,

  setFormData: (d) => set({ formData: d }),
  toggleConfidentialMode: () =>
    set((s) => ({ isConfidentialMode: !s.isConfidentialMode })),
  appendOutput: (chunk) =>
    set((s) => ({ generatedOutput: s.generatedOutput + chunk })),
  setOutput: (v) => set({ generatedOutput: v }),
  setEditedOutput: (v) => set({ editedOutput: v }),
  clearOutput: () => set({ generatedOutput: '', editedOutput: null }),
  setIsGenerating: (v) => set({ isGenerating: v }),
}));
