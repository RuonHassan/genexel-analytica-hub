import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CategorySelectProps {
  value: string;
  onValueChange: (value: string) => void;
  categories: string[];
  placeholder?: string;
  triggerClassName?: string;
  allCategoriesLabel?: string;
}

/**
 * A safer category selection component that handles empty category values properly
 */
export function CategorySelect({
  value,
  onValueChange,
  categories,
  placeholder = "All Categories",
  triggerClassName = "w-full md:w-[180px]",
  allCategoriesLabel = "All Categories"
}: CategorySelectProps) {
  // Filter out any empty categories and normalize the values
  const safeCategories = React.useMemo(() => {
    return categories
      .filter(category => 
        category && 
        typeof category === 'string' && 
        category.trim() !== ''
      )
      .map(category => ({
        value: category.trim(),
        label: category.trim() || 'Uncategorized'
      }))
      .filter((category, index, self) => 
        // Remove duplicates
        index === self.findIndex(c => c.value === category.value)
      );
  }, [categories]);

  // Ensure the current value is valid
  const safeValue = React.useMemo(() => {
    if (!value || value.trim() === '') return '';
    return safeCategories.some(cat => cat.value === value.trim()) ? value.trim() : '';
  }, [value, safeCategories]);

  return (
    <Select 
      value={safeValue} 
      onValueChange={onValueChange}
    >
      <SelectTrigger className={triggerClassName}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">{allCategoriesLabel}</SelectItem>
        {safeCategories.map(({ value, label }) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
} 