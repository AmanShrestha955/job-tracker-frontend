import { Status } from "./ApplicationApi";

export type SearchBarProps = {
  onSearch: (query: string) => void;
};

export type SearchAndFilterParams = {
  search: string;
  status?: Status;
};
