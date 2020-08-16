import React, { useState, useEffect } from "react";
import { firebase } from "../firebase";
import { Authen } from "../firebase";
import Nav from "../navigation";
import Input from "../input";
import ItemLists from "../item-lists";
import SearchPanel from "../search-panel";
import CountItems from "../count-items";
// import JSONPlaceholder from "../../service/api";
import Spinner from "../spinner";
import ColorMode from "../color-mode";
import { DragDropContext } from "react-beautiful-dnd";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./app.css";

const App = () => {
  const [items, setItems] = useState([]);
  const [colorMode, setMode] = useState("night");
  const [loading, setLoad] = useState(true);

  const onChangeMode = (mode) => {
    setMode(() => mode);
  };

  //generate unique id
  let uniqid = require("uniqid");

  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const onImportant = (id) => {
    const searchId = ({ id: idx }) => {
      if (idx === id) {
        return idx;
      }
    };

    const indx = items.findIndex(searchId);

    const element = items[indx];

    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        const todoRef = firebase
          .database()
          .ref(`users/${user.uid}/todos`)
          .child(id);

        todoRef.update({
          ...element,
          id: items[indx]["id"],
          important: !items[indx]["important"],
        });
      } else {
        const todoRef = firebase
          .database()
          .ref(`users/guest-user/todos`)
          .child(id);

        todoRef.update({
          ...element,
          id: items[indx]["id"],
          important: !items[indx]["important"],
        });
      }
    });
  };

  const onDelete = (id) => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        const todoRef = firebase
          .database()
          .ref(`users/${user.uid}/todos`)
          .child(id);

        todoRef.remove();
      } else {
        const todoRef = firebase
          .database()
          .ref(`users/guest-user/todos`)
          .child(id);

        todoRef.remove();
      }
    });
  };

  const onDone = (id) => {
    const searchId = ({ id: idx }) => {
      if (idx === id) {
        return idx;
      }
    };

    const indx = items.findIndex(searchId);

    const element = items[indx];

    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        const todoRef = firebase
          .database()
          .ref(`users/${user.uid}/todos`)
          .child(id);

        todoRef.update({
          ...element,
          id: items[indx]["id"],
          done: !items[indx]["done"],
        });
      } else {
        const todoRef = firebase
          .database()
          .ref(`users/guest-user/todos`)
          .child(id);

        todoRef.update({
          ...element,
          id: items[indx]["id"],
          done: !items[indx]["done"],
        });
      }
    });
  };

  const createItem = (label) => {
    return {
      id: uniqid(),
      label,
      important: false,
      done: false,
    };
  };

  const onAddItem = (labelText) => {
    const validStr = /[^\s]/gim.test(labelText);

    const user = firebase.auth().currentUser;

    if (validStr) {
      const newItm = createItem(labelText);

      const { done, label, id, important } = newItm;

      if (user) {
        console.log("onAddItem()");

        console.log("user login");

        firebase.database().ref(`users/${user.uid}/todos/${id}`).set({
          done,
          label,
          id,
          important,
        });
      } else {
        console.log("onAddItem()");

        console.log("user logout");

        firebase.database().ref(`users/guest-user/todos/${id}`).set({
          done,
          label,
          id,
          important,
        });
      }
    }
  };

  const filterItems = (items, filter) => {
    if (filter === "all") {
      return items;
    } else if (filter === "active") {
      return items.filter((item) => !item["done"]);
    } else if (filter === "done") {
      return items.filter((item) => item["done"]);
    } else if (filter === "important") {
      return items.filter((item) => item["important"]);
    }
  };

  const onSearchChange = (search) => {
    setSearch(() => {
      return search;
    });
  };

  const onFilterChange = (filter) => {
    setFilter(() => {
      return filter;
    });
  };

  const searchItems = (items, search) => {
    if (!!items) {
      return items.filter((item) => {
        return item.label.toLowerCase().indexOf(search.toLowerCase()) > -1;
      });
    }
  };

  let visibleItems = searchItems(filterItems(items, filter), search);

  const onDragEnd = (result) => {
    if (result.destination.index === result.source.index) {
      return;
    }

    const copyItems = [...items];

    const [removedItm] = copyItems.splice(result.source.index, 1);
    copyItems.splice(result.destination.index, 0, removedItm);

    // SEND TO FIREBASE    ##################################################

    const database = firebase.database();

    // Просто видаляє все з бази даних і перезаписує :(

    const user = firebase.auth().currentUser;

    if (user) {
      database
        .ref(`users/${user.uid}/todos/`)
        .set({})
        .then(() => {
          copyItems.map((item) => {
            const id = uniqid();

            firebase
              .database()
              .ref(`users/${user.uid}/todos/${id}`)
              .update({
                ...item,
                id,
              });
          });
        });
    } else {
      database
        .ref(`users/guest-user/todos/`)
        .set({})
        .then(() => {
          copyItems.map((item) => {
            const id = uniqid();

            firebase
              .database()
              .ref(`users/guest-user/todos/${id}`)
              .update({
                ...item,
                id,
              });
          });
        });
    }

    //##################################################################
  };

  useEffect(() => {
    window.setTimeout(() => setLoad(false), 1500);
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        console.log(user.displayName);
        const todoRef = firebase.database().ref(`users/${user.uid}/todos`);
        todoRef.on("value", (snapshot) => {
          const todos = snapshot.val();

          console.log(todos);

          const todoList = [];
          for (let id in todos) {
            todoList.push({ id, ...todos[id] });
          }

          setItems(todoList);
        });
      } else {
        console.log("guest user");

        const todoRef = firebase.database().ref("users/guest-user/todos");
        todoRef.on("value", (snapshot) => {
          const todos = snapshot.val();
          // console.log(todos);

          const todoList = [];
          for (let id in todos) {
            todoList.push({ id, ...todos[id] });
          }

          setItems(todoList);
        });
      }
    });
  }, []);

  useEffect(() => {
    visibleItems = searchItems(filterItems(items, filter), search);
  });

  // const userNow = firebase.auth().currentUser;
  // console.log(userNow, "userNow");

  const allItems = !!items ? items.length : 0;
  const doneItems = !!items ? items.filter((item) => item["done"]).length : 0;

  const countItms = [
    { type: "all", amount: allItems },
    { type: "done", amount: doneItems },
  ];

  return (
    <div className="row d-flex flex-column align-items-center">
      <div className="d-flex flex-row justify-content-between">
        <h2 className="mt-2">Todo List</h2>
        <Authen />
        <ColorMode mode={colorMode} onChangeMode={onChangeMode} />
      </div>
      <Nav filter={filter} onFilterChange={onFilterChange} />

      <div className="container col-6 mt-2">
        <div className="row">
          <SearchPanel onSearchChange={onSearchChange} />
          <CountItems items={countItms} />
        </div>
      </div>

      <Input onAddItem={onAddItem} items={items} />
      <DragDropContext onDragEnd={onDragEnd}>
        {loading ? (
          <Spinner />
        ) : (
          <ItemLists
            items={visibleItems}
            onImportant={onImportant}
            onDelete={onDelete}
            onDone={onDone}
          />
        )}
      </DragDropContext>
    </div>
    // <Router>
    //   {userNow !== null ? (
    //     <Route path="/login" component={<h1>you are login</h1>} />
    //   ) : (
    //     <Route path="/logout" component={<h1>you are log out</h1>} />
    //   )}
    // </Router>
  );
};

export default App;
