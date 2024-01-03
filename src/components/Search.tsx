import React from "react";
import { Input } from "./ui/input";

type Props = {
  search_term: string;
  setSearchTerm: (search_term: string) => void;
};

const Search = ({ search_term, setSearchTerm }: Props) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Input
      type="search"
      id="search"
      value={search_term}
      onChange={onChange}
      placeholder="Search"
      className="focus:outline-none"
    />
  );
};

export default Search;
