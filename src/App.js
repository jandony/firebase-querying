import React, { useState, useEffect } from "react";
import firebase from "firebase";

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
  // useState variables and functions
  const [data, setData] = useState({
    all: [],
    breakfast: [],
    drinks: [],
    searchTerm: "",
  });

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

  console.log(data);

  return (
    <React.Fragment>
      <h1 style={{ textAlign: "center" }}>Firebase Querying App</h1>

      {/* View All Table */}
      <table
        style={{
          textAlign: "left",
          margin: "0 auto",
          marginBottom: "50px",
          width: "75%",
        }}
      >
        <tr>
          <th colSpan={4}>
            <h2>View All Table</h2>
          </th>
        </tr>
        <tr>
          <th>Recipe Name</th>
          <th>Ingredients</th>
          <th>Directions</th>
          <th>Categories</th>
        </tr>
        {data.all.map((recipe) => {
          return (
            <tr key={recipe.name} id={recipe.name}>
              <td>
                <div>{recipe.name}</div>
              </td>
              <td>
                <div>
                  {recipe.ingredients.map((ing) => {
                    return `${ing}, `;
                  })}
                </div>
              </td>
              <td>
                <div>{recipe.directions}</div>
              </td>
              <td>
                <div>
                  {recipe.categories.map((cat) => {
                    return `${cat}, `;
                  })}
                </div>
              </td>
            </tr>
          );
        })}
      </table>

      {/* View All Breakfast Table */}
      <table
        style={{
          textAlign: "left",
          margin: "0 auto",
          marginBottom: "50px",
          width: "75%",
        }}
      >
        <tr>
          <th colSpan={4}>
            <h2>View All Breakfast Table</h2>
          </th>
        </tr>
        <tr>
          <th>Recipe Name</th>
          <th>Ingredients</th>
          <th>Directions</th>
          <th>Categories</th>
        </tr>
        {data.breakfast.map((recipe) => {
          return (
            <tr key={recipe.name} id={recipe.name}>
              <td>
                <div>{recipe.name}</div>
              </td>
              <td>
                <div>
                  {recipe.ingredients.map((ing) => {
                    return `${ing}, `;
                  })}
                </div>
              </td>
              <td>
                <div>{recipe.directions}</div>
              </td>
              <td>
                <div>
                  {recipe.categories.map((cat) => {
                    return `${cat}, `;
                  })}
                </div>
              </td>
            </tr>
          );
        })}
      </table>

      {/* View All Breakfast Table */}
      <table
        style={{
          textAlign: "left",
          margin: "0 auto",
          marginBottom: "50px",
          width: "75%",
        }}
      >
        <tr>
          <th colSpan={4}>
            <h2>View All Drinks Table</h2>
          </th>
        </tr>
        <tr>
          <th>Recipe Name</th>
          <th>Ingredients</th>
          <th>Directions</th>
          <th>Categories</th>
        </tr>
        {data.drinks.map((recipe) => {
          return (
            <tr key={recipe.name} id={recipe.name}>
              <td>
                <div>{recipe.name}</div>
              </td>
              <td>
                <div>
                  {recipe.ingredients.map((ing) => {
                    return `${ing}, `;
                  })}
                </div>
              </td>
              <td>
                <div>{recipe.directions}</div>
              </td>
              <td>
                <div>
                  {recipe.categories.map((cat) => {
                    return `${cat}, `;
                  })}
                </div>
              </td>
            </tr>
          );
        })}
      </table>
    </React.Fragment>
  );
}

export default App;
