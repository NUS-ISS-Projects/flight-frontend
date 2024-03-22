import React, { useState } from "react";
import { Box, TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";

interface Location {
  address: {
    countryName: string;
    countryCode: string;
  };
}
interface LocationSelectorProps {
  selectedCountryCode: string;
  SelectedCountryName: string;
  setSelectedCountry: React.Dispatch<React.SetStateAction<string>>;
  setSelectedCountryName: React.Dispatch<React.SetStateAction<string>>;
}

const toTitleCase = (str: string) => {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const ReturnLocationSelector: React.FC<LocationSelectorProps> = ({
  selectedCountryCode,
  SelectedCountryName,
  setSelectedCountry,
  setSelectedCountryName,
}) => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [inputValue, setInputValue] = useState("");

  const fetchLocations = async (keyword: string) => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_WEB_API_URL}/locations?keyword=${keyword}`
      )
      .then((response) => {
        //console.log(response.data);
        setLocations(response.data);
      })
      .catch((error) => {
        console.error("Error fetching locations", error);
      });
  };

  return (
    <Box sx={{ mt: 1, position: "relative" }}>
      <Autocomplete
        fullWidth
        freeSolo
        autoComplete
        autoHighlight
        options={Array.from(
          new Set(
            locations.map((location) =>
              toTitleCase(location.address.countryName)
            )
          )
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Where to?"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const newValue = event.target.value;
              setInputValue(newValue);
              fetchLocations(newValue);
            }}
          />
        )}
        onChange={(event: React.SyntheticEvent, value: string | null) => {
          const selectedCountryCode = locations.find(
            (location) => toTitleCase(location.address.countryName) === value
          );
          console.log(
            "Selected country code:",
            selectedCountryCode?.address.countryCode
          );
          setSelectedCountry(selectedCountryCode?.address.countryCode || "");
          setSelectedCountryName(value || "");
        }}
      />
    </Box>
  );
};

export default ReturnLocationSelector;
