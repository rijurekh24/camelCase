import React, { useState } from "react";
import {
  Autocomplete,
  Box,
  InputBase,
  Typography,
  CircularProgress,
  Paper,
  Avatar,
} from "@mui/material";
import { Link } from "react-router-dom";
import Api from "../../Utils/api";

const Search = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  // const handleSearch = (query) => {
  //   setIsFetching(true);
  //   Api.post("/auth/search", { query })
  //     .then((response) => {
  //       setSearchResult(response.data.search_res[0].users);
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error.response);
  //     })
  //     .finally(() => {
  //       setIsFetching(false);
  //     });
  // };

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchInput(value);

    if (value.trim() !== "") {
      setIsFetching(true);
      Api.post("/auth/search", { value })
        .then((response) => {
          setSearchResult(response.data.search_res[0].users);
        })
        .catch((error) => {
          console.error("Error:", error.response);
        })
        .finally(() => {
          setIsFetching(false);
        });
    } else {
      setSearchResult([]);
    }
  };

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={searchInput ? searchResult : []}
      ListboxProps={{
        sx: {
          maxHeight: 300,
          padding: 0,
          overflowY: "scroll",
          "&::-webkit-scrollbar": {
            width: "0px",
          },
        },
      }}
      getOptionLabel={(option) => {
        const fullName = `${option.first_name} ${option.last_name}`;
        return `${option.username} (${option.first_name} ${option.last_name})`;
      }}
      renderOption={(props, option) => (
        <Link
          to={`/profile/${option.username}`}
          style={{ textDecoration: "none", color: "white" }}
        >
          <Box {...props}>
            <Box display={"flex"} alignItems={"center"}>
              <Box mr={1}>
                <Avatar src={option.profile_pic}></Avatar>
              </Box>
              <Box>
                <Typography
                  sx={{ color: "#ccc" }}
                >{` @${option.username}`}</Typography>
                <Typography>{`${option.first_name} ${option.last_name}`}</Typography>
              </Box>
            </Box>
          </Box>
        </Link>
      )}
      freeSolo={searchInput?.length ? false : true}
      noOptionsText={
        isFetching ? (
          <Box width={"100%"} textAlign={"center"}>
            <CircularProgress size={20} sx={{ color: "white" }} />
          </Box>
        ) : (
          <Box textAlign={"center"}>
            <Typography color={"white"}>No matches...</Typography>
          </Box>
        )
      }
      PaperComponent={({ children }) => (
        <Paper
          sx={{
            backgroundColor: "rgba(200,200,200,0.1)",
            borderRadius: "15px",
            marginTop: "2%",
            backdropFilter: "blur(20px)",
          }}
        >
          {children}
        </Paper>
      )}
      sx={{ width: 300 }}
      renderInput={(params) => {
        const { InputLabelProps, InputProps, ...rest } = params;
        return (
          <Box position="relative">
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
          </Box>
        );
      }}
    />
  );
};

export default Search;
