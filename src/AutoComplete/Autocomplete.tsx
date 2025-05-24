import React, { useState } from "react";
import { TextField, List, ListItem, ListItemText, Paper, Box } from "@mui/material";

// Debounce function
function debounce(func, delay) {
  let timer;
  return function (...args) {
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

// Mock API to simulate fetching suggestions
const fetchSuggestions = (query) => {
  const suggestions = [
    "Apple",
    "Banana",
    "Cherry",
    "Date",
    "Elderberry",
    "Fig",
    "Grape",
  ];
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        suggestions.filter((item) =>
          item.toLowerCase().includes(query.toLowerCase())
        )
      );
    }, 500); // Simulate network delay
  });
};

const Autocomplete = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [open, setOpen] = useState(false);

  // Debounced function to fetch suggestions
  const debouncedFetchSuggestions = debounce((q) => {
    if (q.trim() === "") {
      setSuggestions([]);
      setOpen(false);
      return;
    }
    fetchSuggestions(q).then((results:any) => {
      setSuggestions(results);
      setOpen(results.length > 0);
    });
  }, 300);

  // Handle input change
  const handleInputChange = (event) => {
    const value = event.target.value;
    setQuery(value);
    debouncedFetchSuggestions(value);
  };

  // Handle suggestion selection
  const handleSelect = (suggestion) => {
    setQuery(suggestion);
    setSuggestions([]);
    setOpen(false);
  };

  return (
    <Box sx={{ width: 300, position: "relative" }}>
      <TextField
        label="Search"
        value={query}
        onChange={handleInputChange}
        fullWidth
        variant="outlined"
        placeholder="Type to search..."
      />
      {open && suggestions.length > 0 && (
        <Paper
          sx={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            maxHeight: 200,
            overflowY: "auto",
            zIndex: 1,
          }}
        >
          <List>
            {suggestions.map((suggestion, index) => (
              <ListItem
                key={index}
                onClick={() => handleSelect(suggestion)}
                sx={{ cursor: "pointer" }}
              >
                <ListItemText primary={suggestion} />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default Autocomplete;