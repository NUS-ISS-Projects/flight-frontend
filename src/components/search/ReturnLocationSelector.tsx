import React, { useState, useEffect } from "react";
import { Box, TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import countriesData from "@/store/countries.json";

interface Airport {
  code: string;
  name: string;
}

interface CountryAirport {
  label: string;
  countryName: string;
  airportName: string;
  airportCode: string;
}
interface CountrySelectorProps {
  selectedAirportName: string;
  selectedAirportCode: string;
  setSelectedAirportName: React.Dispatch<React.SetStateAction<string>>;
  setSelectedAirportCode: React.Dispatch<React.SetStateAction<string>>;
}

const ReturnLocationSelector: React.FC<CountrySelectorProps> = ({
  selectedAirportName,
  selectedAirportCode,
  setSelectedAirportName,
  setSelectedAirportCode,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState<CountryAirport[]>([]);

  useEffect(() => {
    if (inputValue.length > 0) {
      const newOptions: CountryAirport[] = [];
      Object.entries(countriesData).forEach(([countryName, cities]) => {
        Object.entries(cities).forEach(([airportName, airports]) => {
          airports.forEach((airport) => {
            newOptions.push({
              label: `${airportName} (${airport.code})`,
              countryName: countryName,
              airportName: airportName,
              airportCode: airport.code,
            });
          });
        });
      });
      setOptions(
        newOptions
          .filter((option) =>
            option.label.toLowerCase().includes(inputValue.toLowerCase())
          )
          .slice(0, 8)
      );
    } else {
      setOptions([]);
    }
  }, [inputValue]);

  return (
    <Box sx={{ mt: 2 }}>
      <Autocomplete
        fullWidth
        freeSolo
        value={selectedAirportName}
        options={options}
        getOptionLabel={(option) => {
          if (typeof option === "string") return option;
          return option.label || "";
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Where to?"
            variant="outlined"
            onChange={(e) => setInputValue(e.target.value)}
          />
        )}
        onChange={(
          event: React.SyntheticEvent,
          value: string | CountryAirport | null
        ) => {
          if (value && typeof value === "object" && "countryName" in value) {
            console.log(
              "Selected country and airport - Return:",
              value.airportName,
              value.airportCode
            );
            setSelectedAirportName(value.airportName || "");
            setSelectedAirportCode(value.airportCode || "");
          } else if (typeof value === "string") {
            setSelectedAirportName(value);
          }
        }}
      />
    </Box>
  );
};

export default ReturnLocationSelector;
