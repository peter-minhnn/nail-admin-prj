import { useEffect, useReducer } from 'react';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

type TextInputProps = {
  form: UseFormReturn<any>;
  name: string;
  label: string;
  placeholder: string;
  namespace: string;
  maxLength?: number;
  reset?: boolean;
  editInline?: boolean;
  disabled?: boolean;
  hasError?: boolean;
  className?: string;
  suppressEdit?: boolean;
  loading?: boolean;
};

const NumberFormatter = {
  vi: 'vi-VN',
  ko: 'ko-KR',
  en: 'en-US',
} as Record<string, string>;

const numberFormatter = () =>
  Intl.NumberFormat(NumberFormatter['en'], { minimumFractionDigits: 0 });

export const NumberInput = (props: Readonly<TextInputProps>) => {
  const initialValue = props.form.watch(props.name)
    ? numberFormatter().format(props.form.watch(props.name))
    : '';

  const [value, setValue] = useReducer((_: any, next: string) => {
    const digits = next.replace(/\D/g, '');
    return numberFormatter().format(Number(digits));
  }, initialValue);

  function handleChange(realChangeFn: any, formattedValue: string) {
    const digits = formattedValue.replace(/\D/g, '');
    realChangeFn(Number(digits));
  }

  useEffect(() => {
    if (initialValue) {
      setValue(initialValue);
    }
  }, [initialValue]);

  return (
    <FormField
      control={props.form.control}
      name={props.name}
      render={({ field }) => {
        field.value = value;
        const _change = field.onChange;

        return (
          <FormItem className={cn('w-full', props.className)}>
            {props.editInline && (
              <div className="flex flex-row items-center w-full gap-2">
                <FormLabel className="min-w-fit">{props.label}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={props.placeholder}
                    type="text"
                    onChange={(ev) => {
                      if (props.suppressEdit) return;
                      setValue(ev.target.value);
                      handleChange(_change, ev.target.value);
                    }}
                    value={value ?? initialValue}
                    hasError={
                      props.hasError ||
                      Boolean(props.form.formState.errors[props.name])
                    }
                    maxLength={props.maxLength}
                    disabled={props.disabled}
                  />
                </FormControl>
              </div>
            )}
            {!props.editInline && (
              <>
                <FormLabel>{props.label}</FormLabel>
                {props.loading && <Skeleton className="h-9 w-full" />}
                <FormControl className={cn({ hidden: props.loading })}>
                  <Input
                    placeholder={props.placeholder}
                    type="text"
                    onChange={(ev) => {
                      if (props.suppressEdit) return;
                      setValue(ev.target.value);
                      handleChange(_change, ev.target.value);
                    }}
                    value={value ?? initialValue}
                    hasError={
                      props.hasError ||
                      Boolean(props.form.formState.errors[props.name])
                    }
                    maxLength={props.maxLength}
                    disabled={props.disabled}
                  />
                </FormControl>
              </>
            )}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
