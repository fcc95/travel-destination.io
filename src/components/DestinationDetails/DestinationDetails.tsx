import React from "react";
import { Destination } from "../../utils/models/model";
import "./DestinationDetails.scss";

interface IDestinationDetailsProps {
  selectedDestination: Destination | null;
}

function DestinationDetails({ selectedDestination }: IDestinationDetailsProps) {
  if (!selectedDestination) {
    return <p>Select a destination to view details.</p>;
  }

  return (
    <div>
      <h2>{selectedDestination.name}</h2>
      <p>{selectedDestination.description}</p>
      <h3>Nearby Destinations:</h3>
      <ul>
        {selectedDestination?.nearbyDestinations?.map((destination) => (
          <li className="nearby-item" key={destination.id}>
            {destination.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DestinationDetails;
