import { Autocomplete, Box, InputBase, Typography } from "@mui/material";
import React, { useState } from "react";
import Api from "../../Utils/api";

const Search = () => {
  const [username, setUsername] = useState("");
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
        console.log(response.data.search_res[0].users);
        setSearchResult(response.data.search_res[0].users);
      })
      .catch((error) => {
        console.error("Error:", error.response);
      });
  };

  const delayedSearch = debounce(handleSearch, 500);

  const handleChange = (e) => {
    setUsername(e.target.value);
    if (e.target.value.trim() !== "") {
      delayedSearch(e.target.value);
    }
    if (!e.target.value) {
      setSearchResult([]);
    }
  };

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={searchResult
        .map((user) => {
          const fullName = `${user.first_name} ${user.last_name}`;

          if (user.username.toLowerCase().includes(username.toLowerCase())) {
            return user.username + (fullName ? ` (${fullName})` : "");
          } else if (fullName.toLowerCase().includes(username.toLowerCase())) {
            return fullName + (user.username ? ` (${user.username})` : "");
          }
          return null;
        })
        .filter(Boolean)}
      noOptionsText={username ? "Not found" : "Search"}
      sx={{ width: 300 }}
      renderInput={(params) => {
        const { InputLabelProps, InputProps, ...rest } = params;
        return (
          <InputBase
            {...params.InputProps}
            {...rest}
            id="search-input"
            value={username}
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
