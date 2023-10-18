import React from "react";
import AsyncSelect from "react-select/async";
import { ISelectOption } from "../../utils/models/model";

interface DestinationSearchProps {
  onSelect: (destination: ISelectOption | null) => void;
  onPromiseOptions: (
    inputValue: string,
    callback: (options: ISelectOption[]) => void
  ) => void;
}

const DestinationSearch = ({
  onSelect,
  onPromiseOptions,
}: DestinationSearchProps) => {
  const handleSelect = (selectedOption: ISelectOption | null) => {
    onSelect(selectedOption);
  };

  return (
    <AsyncSelect
      cacheOptions
      defaultOptions
      isClearable={true}
      loadOptions={onPromiseOptions}
      // @ts-ignore
      onChange={handleSelect}
    />
  );
};

export default DestinationSearch;
