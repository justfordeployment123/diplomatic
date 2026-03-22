'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { GeneratorConfig, FieldConfig } from '@/types/generator.types';
import { useGeneratorStore } from '@/stores/generatorStore';
import { useGenerate } from '@/hooks/useGenerate';
import FormSection from '@/components/molecules/FormSection';
import Input from '@/components/atoms/Input';
import Textarea from '@/components/atoms/Textarea';
import Select from '@/components/atoms/Select';
import DatePicker from '@/components/atoms/DatePicker';
import TimePicker from '@/components/atoms/TimePicker';
import Toggle from '@/components/atoms/Toggle';
import MultiListInput from '@/components/molecules/MultiListInput';
import MultiSelect from '@/components/molecules/MultiSelect';
import ConditionalField from '@/components/molecules/ConditionalField';
import Button from '@/components/atoms/Button';
import { ShieldAlert } from 'lucide-react';

interface GeneratorFormProps {
  config: GeneratorConfig;
}

export default function GeneratorForm({ config }: GeneratorFormProps) {
  const { setFormData, isConfidentialMode, toggleConfidentialMode, isGenerating } =
    useGeneratorStore();
  const { generate } = useGenerate(config);

  const { register, control, handleSubmit, watch, formState: { errors } } =
    useForm({ mode: 'onBlur' });

  const onSubmit = (data: Record<string, unknown>) => {
    setFormData(data);
    generate();
  };

  const renderField = (field: FieldConfig, sectionSpan = false) => {
    const span = ['textarea', 'multilist', 'conditional'].includes(field.type) || sectionSpan
      ? 'sm:col-span-2'
      : '';

    const key = field.id;
    const error = errors[field.id]?.message as string | undefined;

    switch (field.type) {
      case 'text':
      case 'number':
        return (
          <div key={key} className={span}>
            <Input
              {...register(field.id, { required: field.required ? `${field.label} is required` : false })}
              label={field.label}
              placeholder={field.placeholder}
              type={field.type === 'number' ? 'number' : 'text'}
              min={field.min}
              max={field.max}
              required={field.required}
              mono={field.mono}
              error={error}
            />
          </div>
        );

      case 'textarea':
        return (
          <div key={key} className={span}>
            <Controller
              name={field.id}
              control={control}
              rules={{ required: field.required ? `${field.label} is required` : false }}
              render={({ field: f }) => (
                <Textarea
                  {...f}
                  label={field.label}
                  placeholder={field.placeholder}
                  rows={field.rows}
                  required={field.required}
                  error={error}
                />
              )}
            />
          </div>
        );

      case 'select':
        return (
          <div key={key} className={span}>
            <Select
              {...register(field.id, { required: field.required ? `${field.label} is required` : false })}
              label={field.label}
              options={field.options || []}
              placeholder="Select..."
              required={field.required}
              error={error}
            />
          </div>
        );

      case 'multi-select':
        return (
          <div key={key} className={span}>
            <Controller
              name={field.id}
              control={control}
              defaultValue={[]}
              render={({ field: f }) => (
                <MultiSelect
                  label={field.label}
                  options={field.options || []}
                  value={f.value || []}
                  onChange={f.onChange}
                />
              )}
            />
          </div>
        );

      case 'multilist':
        return (
          <div key={key} className={span}>
            <Controller
              name={field.id}
              control={control}
              defaultValue={[]}
              rules={{ required: field.required ? `${field.label} is required` : false }}
              render={({ field: f }) => (
                <MultiListInput
                  label={field.label}
                  placeholder={field.placeholder}
                  value={f.value || []}
                  onChange={f.onChange}
                  error={error}
                />
              )}
            />
          </div>
        );

      case 'date':
        return (
          <div key={key} className={span}>
            <DatePicker
              {...register(field.id, { required: field.required ? `${field.label} is required` : false })}
              label={field.label}
              required={field.required}
              error={error}
            />
          </div>
        );

      case 'time':
        return (
          <div key={key} className={span}>
            <TimePicker
              {...register(field.id)}
              label={field.label}
              error={error}
            />
          </div>
        );

      case 'toggle':
        return (
          <div key={key} className="sm:col-span-2">
            <Controller
              name={field.id}
              control={control}
              defaultValue={false}
              render={({ field: f }) => (
                <Toggle
                  checked={!!f.value}
                  onChange={f.onChange}
                  label={field.label}
                />
              )}
            />
          </div>
        );

      case 'conditional': {
        const controlValue = watch(field.controlledBy || '');
        return (
          <div key={key} className="sm:col-span-2">
            <ConditionalField show={!!controlValue === field.showWhen}>
              {field.childField && renderField(field.childField, true)}
            </ConditionalField>
          </div>
        );
      }

      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit as Parameters<typeof handleSubmit>[0])} className="flex flex-col gap-4">
      {config.sections.map((section) => (
        <FormSection
          key={section.id}
          title={section.title}
          collapsible={section.collapsible}
          defaultCollapsed={section.defaultCollapsed}
        >
          {section.fields.map((field) => renderField(field))}
        </FormSection>
      ))}

      {/* Confidential Mode */}
      <div className="bg-gold-100 border border-gold-400 rounded-[var(--radius-lg)] p-4 flex items-start gap-3">
        <ShieldAlert size={18} className="text-gold-700 shrink-0 mt-0.5" />
        <div className="flex-1">
          <Toggle
            id="confidential-mode"
            checked={isConfidentialMode}
            onChange={toggleConfidentialMode}
            label="Confidential Mode"
            helper="Sensitive fields will be replaced with [PLACEHOLDER] tags — raw data never leaves your browser"
          />
        </div>
      </div>

      <Button
        type="submit"
        size="lg"
        isLoading={isGenerating}
        className="w-full"
      >
        {isGenerating ? 'Generating...' : 'Generate Document'}
      </Button>
    </form>
  );
}
