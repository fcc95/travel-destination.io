import React, { useMemo, useState } from "react";
import "./App.scss";
import DestinationDetails from "./components/DestinationDetails/DestinationDetails";
import DestinationSearch from "./components/DestinationSearch/DestinationSearch";
import Error from "./components/Error/Error";

import { fetchDestinations, getDestinationDetails } from "./utils/api/fake-api";
import { Destination, ISelectOption } from "./utils/models/model";
import { findNearestDestinations } from "./services/helper";
import { debounce } from "lodash-es";

function App() {
  const [selectedDestination, setSelectedDestination] =
    useState<Destination | null>(null);
  const [error, setError] = useState();

  const handleDestinationSelect = (option: ISelectOption | null) => {
    if (!option) {
      setSelectedDestination(null);
      return;
    }
    const { value } = option;
    getDestinationDetails(Number(value)).then((data) => {
      if (data) {
        const nearbyLocations = findNearestDestinations(data);
        setSelectedDestination({
          ...data,
          nearbyDestinations: nearbyLocations.map(({ id, name }) => ({
            id,
            name,
          })),
        });
      }
    });
  };

  const debouncedSearchOptions: (
    inputValue: string,
    callback: (options: ISelectOption[]) => void
  ) => void = useMemo(
    () =>
      debounce(
        (inputValue: string, callback: (options: ISelectOption[]) => void) => {
          if (inputValue.length) {
            const destinations = fetchDestinations(inputValue);
            destinations
              .then((data) => {
                const mappedDestinations = data.map((item) => ({
                  value: String(item.id),
                  label: item.name,
                }));
                callback(mappedDestinations);
              })
              .catch((e) => {
                setError(e.message);
              });
          } else {
            callback([]);
          }
        },
        500
      ),
    []
  );

  return (
    <div className="App">
      <h1>Travel Destinations</h1>
      <DestinationSearch
        onSelect={handleDestinationSelect}
        onPromiseOptions={debouncedSearchOptions}
      />
      {!error && (
        <DestinationDetails selectedDestination={selectedDestination} />
      )}
      {error && <Error message={error} />}
    </div>
  );
}

export default App;
