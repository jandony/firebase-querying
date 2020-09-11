import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import firebase from "firebase";

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  centerText: {
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  queryField: {
    width: "25%",
    [theme.breakpoints.down("xs")]: {
      width: "95%",
    },
    margin: "1em",
  },
  cell: {
    fontWeight: "bold",
    color: "white",
  },
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: "#f5f5f5",
    },
  },
  ingredients: {
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  directions: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAoQvD6palv1-FI6xhOhvD3gs6FoDugd4I",
  authDomain: "fir-crud-deed4.firebaseapp.com",
  databaseURL: "https://fir-crud-deed4.firebaseio.com",
  projectId: "fir-crud-deed4",
  storageBucket: "fir-crud-deed4.appspot.com",
  messagingSenderId: "68349858800",
  appId: "1:68349858800:web:42a207073147f9f28f0335",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function App() {
  // reference Styles from Material UI
  const classes = useStyles();

  // useState variables and functions
  const [data, setData] = useState({
    all: [],
    breakfast: [],
    drinks: [],
    searchQuery: [],
  });

  const [selectQuery, setQuery] = useState({ name: "", queryData: [] });
  const [searchQuery, setSearchQuery] = useState("");

  // READ - Access "recipes" collection from Firebase
  useEffect(() => {
    const recipesRef = firebase
      .firestore()
      .collection("users")
      .doc("user1")
      .collection("recipes");

    // get all data
    recipesRef.onSnapshot((snapshot) => {
      const newData = snapshot.docs.map((doc) => ({
        ...doc.data(),
      }));

      setData((dataState) => {
        return { ...dataState, all: newData };
      });
    });

    // get all breakfast
    recipesRef
      .where("categories", "array-contains", "breakfast")
      .onSnapshot((snapshot) => {
        const newBreakfast = snapshot.docs.map((doc) => ({
          ...doc.data(),
        }));

        setData((dataState) => {
          return { ...dataState, breakfast: newBreakfast };
        });
      });

    // get all drinks
    recipesRef
      .where("categories", "array-contains", "drinks")
      .onSnapshot((snapshot) => {
        const newDrinks = snapshot.docs.map((doc) => ({
          ...doc.data(),
        }));

        setData((dataState) => {
          return { ...dataState, drinks: newDrinks };
        });
      });
  }, []);

  // select dropdown
  const handleChange = (event) => {
    const queryValue = event.target.value;

    if (queryValue === "all") {
      setQuery({ name: "all", queryData: data.all });
    } else if (queryValue === "breakfast") {
      setQuery({ name: "breakfast", queryData: data.breakfast });
    } else if (queryValue === "drinks") {
      setQuery({ name: "drinks", queryData: data.drinks });
    } else {
      setQuery({ name: "", queryData: [] });
    }
  };

  // handle Query Hanlder
  const handleQueryHandler = (event) => {
    // const lowercaseQuery = event.target.value.toLowerCase();

    setSearchQuery(event.target.value);
  };

  // handle submit
  const handleSubmit = (event) => {
    event.preventDefault();

    if (searchQuery === "all") {
      setQuery({ name: "all", queryData: data.all });
      setSearchQuery("");
    } else if (searchQuery === "breakfast") {
      setQuery({ name: "breakfast", queryData: data.breakfast });
      setSearchQuery("");
    } else if (searchQuery === "drinks") {
      setQuery({ name: "drinks", queryData: data.drinks });
      setSearchQuery("");
    } else if (searchQuery === "") {
      setQuery({ name: "all", queryData: data.all });
      setSearchQuery("");
    } else {
      setQuery({ name: data.searchQuery, queryData: data.searchQuery });
      setSearchQuery("");

      // get search term results from firebase
      firebase
        .firestore()
        .collection("users")
        .doc("user1")
        .collection("recipes")
        .where("name", "==", searchQuery)
        .onSnapshot((snapshot) => {
          const newSearch = snapshot.docs.map((doc) => ({
            ...doc.data(),
          }));

          setData((dataState) => {
            return { ...dataState, searchQuery: newSearch };
          });

          setQuery((queryState) => {
            return { ...queryState, queryData: newSearch };
          });
        });
    }
  };

  return (
    <React.Fragment>
      <h1 className={classes.centerText}>Firebase Querying App</h1>

      {/* Query Select */}
      <div className={classes.centerText}>
        <FormControl variant="outlined" className={classes.queryField}>
          <InputLabel id="query-select-label">Select a Query</InputLabel>
          <Select
            labelId="query-select-label"
            id="query-select"
            value={selectQuery.name}
            onChange={handleChange}
            label="Select a Query"
            style={{ textAlign: "left" }}
          >
            <MenuItem value="">
              <em>Select a Query</em>
            </MenuItem>
            <MenuItem value={"all"}>All</MenuItem>
            <MenuItem value={"breakfast"}>Breakfast</MenuItem>
            <MenuItem value={"drinks"}>Drinks</MenuItem>
          </Select>
        </FormControl>
        <h2>OR</h2>
      </div>

      {/* Query Search Field */}
      <div style={{ textAlign: "center", marginBottom: "3em" }}>
        <form
          validate
          autoComplete="off"
          onSubmit={handleSubmit}
          className={classes.form}
        >
          <TextField
            id="search-query"
            label="Search"
            variant="outlined"
            margin="dense"
            value={searchQuery}
            onChange={handleQueryHandler}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            style={{ marginLeft: "1em" }}
          >
            Search
          </Button>
        </form>
      </div>

      {/* View All Table */}
      <TableContainer
        component={Paper}
        style={{ width: "95%", margin: "0 auto" }}
      >
        <Table aria-label="simple table">
          <TableHead style={{ background: "#3f51b5" }}>
            <TableRow>
              <TableCell className={classes.cell}>Recipe Name</TableCell>
              <TableCell className={`${classes.cell} ${classes.ingredients}`}>
                Ingredients
              </TableCell>
              <TableCell className={`${classes.cell} ${classes.directions}`}>
                Directions
              </TableCell>
              <TableCell className={classes.cell}>Categories</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {selectQuery.queryData.map((recipe) => (
              <TableRow
                component="th"
                scope="row"
                key={recipe.name}
                className={classes.row}
              >
                <TableCell>{recipe.name}</TableCell>
                <TableCell className={classes.ingredients}>
                  {recipe.ingredients.join(", ")}
                </TableCell>
                <TableCell className={classes.directions}>
                  {recipe.directions}
                </TableCell>
                <TableCell>{recipe.categories.join(", ")}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}

export default App;
