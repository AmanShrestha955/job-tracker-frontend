import { Status } from "./ApplicationApi";

export type SearchBarProps = {
  onSearch: (query: string) => void;
};

export type SearchAndFilterParams = {
  search: string;
  status?: Status;
};

export type DropdownButtonProps<T> = {
  options: T[];
  value: T | undefined;
  onSelect: (value: T | undefined) => void;
  placeholder: string;
  showAllOption?: boolean;
  fullWidth?: boolean;
};
