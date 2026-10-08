import { memo, useEffect, useState } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBoxProps {
  defaultValue?: string;
  onSearch: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const SearchBox = ({
  defaultValue = "",
  onSearch,
  placeholder = "Search...",
  className,
}: SearchBoxProps) => {
  const [value, setValue] = useState(defaultValue);

  // Resync when the committed value changes from outside (e.g. back/forward
  // navigation or a "clear filters" action) without re-rendering on keystroke.
  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  return (
    <div className={cn("relative min-w-64 flex-1 bg-white", className)}>
      <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-tertiary-300" />
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSearch(value);
          }
        }}
        placeholder={placeholder}
        className="h-10 w-full rounded-lg border border-tertiary-75 pr-3 pl-9 text-sm text-tertiary-100 outline-none focus:border-primary-500"
      />
    </div>
  );
};

export default memo(SearchBox);
