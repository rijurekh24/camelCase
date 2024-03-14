import React, { useState } from "react";
import { Autocomplete, Box, InputBase, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Api from "../../Utils/api";

const Search = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const handleSearch = (query) => {
    Api.post("/auth/search", { query })
      .then((response) => {
        setSearchResult(response.data.search_res[0].users);
      })
      .catch((error) => {
        console.error("Error:", error.response);
      });
  };

  const delayedSearch = debounce(handleSearch, 500);

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchInput(value);

    if (value.trim() !== "") {
      delayedSearch(value);
    } else {
      setSearchResult([]);
    }
  };

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={searchResult}
      getOptionLabel={(option) => {
        const fullName = `${option.first_name} ${option.last_name}`;
        return `${option.username} (${option.first_name} ${option.last_name})`;
      }}
      renderOption={(props, option) => (
        <Link
          to={`/profile?username=${option.username}`}
          style={{ textDecoration: "none" }}
        >
          <Box {...props}>
            <Typography variant="body1">{`${option.username} (${option.first_name} ${option.last_name})`}</Typography>
          </Box>
        </Link>
      )}
      noOptionsText={searchInput ? "Not found" : "Search"}
      sx={{ width: 300 }}
      renderInput={(params) => {
        const { InputLabelProps, InputProps, ...rest } = params;
        return (
          <InputBase
            {...params.InputProps}
            {...rest}
            id="search-input"
            value={searchInput}
            onChange={handleChange}
            placeholder="Search"
            sx={{
              width: { xs: "100%", md: "90%" },
              padding: "4px 20px 4px 20px",
              bgcolor: "backgroundColor.secondary",
              borderRadius: "15px",
              color: "textColor.main",
              fontSize: "0.9rem",
            }}
          />
        );
      }}
    />
  );
};

export default Search;
