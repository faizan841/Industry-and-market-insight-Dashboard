import React, { useState } from "react";
import Header from "../../components/Header";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box,
} from "@mui/material";
import LikelihoodCards from "../../components/LikelihoodCards";
import {
  usePostLikelihoodMutation,
  useGetLikelihoodQuery,
} from "../../state/api";

const Likelihood = () => {
  const { data: initialData, isLoading, isError } = useGetLikelihoodQuery();

  const [postLikelihood] = usePostLikelihoodMutation();

  const [selectedLikelihood, setSelectedLikelihood] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [submittedData, setSubmittedData] = useState(null);

  console.log(initialData);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  let countries = [];
  if (initialData?.countries) {
    countries = initialData?.countries.filter((item) => {
      return item !== "";
    });
  }

  const likelihoodValues = [1, 2, 3, 4];

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await postLikelihood({
        likelihood: selectedLikelihood,
        country: selectedCountry,
      });
      console.log("POST request sent successfully!", response.data[0].title);
      setSubmittedData(response.data); // Update submittedData with new data
    } catch (error) {
      console.error("Error sending POST request:", error);
    }
  };

  return (
    <>
      <Header
        title="Likelihood"
        subtitle="Events based on Likelihood in different countries"
      />
      <Box sx={{ display: "flex" }} mt="40px">
        <FormControl sx={{ width: "100%" }}>
          <InputLabel shrink id="likelihood-label">
            Select Likelihood:
          </InputLabel>
          <Select
            labelId="likelihood-label"
            value={selectedLikelihood}
            onChange={(event) => setSelectedLikelihood(event.target.value)}
          >
            {likelihoodValues.map((value) => (
              <MenuItem key={value} value={value}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ width: "100%" }}>
          <InputLabel shrink id="country-label">
            Select Country:
          </InputLabel>
          <Select
            labelId="country-label"
            value={selectedCountry}
            onChange={(event) => setSelectedCountry(event.target.value)}
            size="6" // limit the number of options displayed
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 150, // set the max height of the menu
                  overflowY: "auto", // add a scrollbar
                },
              },
            }}
          >
            {countries &&
              countries.map((country) => (
                <MenuItem key={country} value={country} dense>
                  {country}
                </MenuItem>
              ))}
          </Select>
        </FormControl>

        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>

      {submittedData ? (
        <LikelihoodCards response={submittedData} />
      ) : (
        <LikelihoodCards response={initialData.likelihoodData} />
      )}
    </>
  );
};

export default Likelihood;
