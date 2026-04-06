import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const searchSchema = z.object({
  search: z.string().min(2, 'Enter at least 2 characters').or(z.literal(''))
});

type SearchFormValues = z.infer<typeof searchSchema>;

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  onSearch: (value: string) => void;
};

export function SearchInput({ value, onChange, onSearch }: SearchInputProps) {
  const { control, handleSubmit, reset, formState } = useForm<SearchFormValues>({
    resolver: zodResolver(searchSchema),
    defaultValues: { search: value }
  });

  useEffect(() => {
    reset({ search: value });
  }, [reset, value]);

  const handleFormSubmit = handleSubmit(({ search }) => {
    onSearch(search ?? '');
  });

  return (
    <form className="search-form" onSubmit={handleFormSubmit}>
      <Controller
        name="search"
        control={control}
        render={({ field }) => (
          <input
            type="text"
            className="search-input"
            placeholder="Search games..."
            value={field.value}
            onChange={(event) => {
              const newValue = event.target.value;
              field.onChange(newValue);
              onChange(newValue);
            }}
          />
        )}
      />
      <button type="submit" className="search-submit">
        Search
      </button>
      {formState.errors.search && <span className="error-text">{formState.errors.search.message}</span>}
    </form>
  );
}
