import React, { useState, useEffect, useContext } from 'react';
import { auth, fire_data_base } from '../firebase/authen';
import { firebase } from '../firebase';
import Nav from '../navigation';
import Input from '../input';
import ItemLists from '../item-lists';
import SearchPanel from '../search-panel';
import CountItems from '../count-items';
import Spinner from '../spinner';
import ColorMode from 'components/color-mode';
import { DragDropContext } from 'react-beautiful-dnd';
import { UserContext } from "context/userProvider";

import './app.css';

const Home = () => {
  const [items, setItems] = useState([]);
  const [colorMode, setMode] = useState('night');
  const [loading, setLoad] = useState(true);
  const user = useContext(UserContext);


  const onChangeMode = (mode) => {
    setMode(() => mode);

  };

  //generate unique id
  let uniqid = require('uniqid');

  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

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
        const todoRef = firebase.database().ref(`users/${user.uid}/todos`).child(id);

        todoRef.update({
          ...element,
          id: items[indx]['id'],
          important: !items[indx]['important'],
        });
      } else {
        const todoRef = firebase.database().ref(`users/guest-user/todos`).child(id);

        todoRef.update({
          ...element,
          id: items[indx]['id'],
          important: !items[indx]['important'],
        });
      }
    });
  };

  const onDelete = (id) => {
    const todoRef_to_delete = fire_data_base.ref(`users/${user.uid}/todos`).child(id);
    todoRef_to_delete.remove();
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
        const todoRef = firebase.database().ref(`users/${user.uid}/todos`).child(id);

        todoRef.update({
          ...element,
          id: items[indx]['id'],
          done: !items[indx]['done'],
        });
      } else {
        const todoRef = firebase.database().ref(`users/guest-user/todos`).child(id);

        todoRef.update({
          ...element,
          id: items[indx]['id'],
          done: !items[indx]['done'],
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

    const user = auth.currentUser;

    if (validStr) {
      const newItm = createItem(labelText);

      const { done, label, id, important } = newItm;

      if (user) {
        console.log('onAddItem()');

        console.log('user login');

        fire_data_base.ref(`users/${user.uid}/todos/${id}`).set({
          done,
          label,
          id,
          important,
        });
      } else {
        console.log('onAddItem()');

        console.log('user logout');

        fire_data_base.ref(`users/guest-user/todos/${id}`).set({
          done,
          label,
          id,
          important,
        });
      }
    }
  };

  const filterItems = (items, filter) => {
    if (filter === 'all') {
      return items;
    } else if (filter === 'active') {
      return items.filter((item) => !item['done']);
    } else if (filter === 'done') {
      return items.filter((item) => item['done']);
    } else if (filter === 'important') {
      return items.filter((item) => item['important']);
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

    const database = fire_data_base;

    // Просто видаляє все з бази даних і перезаписує :(

    const user = auth.currentUser;

    if (user) {
      database
        .ref(`users/${user.uid}/todos/`)
        .set({})
        .then(() => {
          copyItems.map((item) => {
            const id = uniqid();

            database
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

            database
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
    window.setTimeout(() => setLoad(false), 500);
    if (!user) return
    const todoRef = fire_data_base.ref(`users/${user.uid}/todos`);
    todoRef.on('value', (snapshot) => {
      const todos = snapshot.val();

      if (!todos) return
      const todoList = Object.keys(todos).map(key => ({
        key, ...todos[key]
      }))


      setItems(todoList);
    });

  }, [user]);

  useEffect(() => {
    visibleItems = searchItems(filterItems(items, filter), search);
  });

  // const userNow = firebase.auth().currentUser;
  // console.log(userNow, "userNow");

  const allItems = !!items ? items.length : 0;
  const doneItems = !!items ? items.filter((item) => item['done']).length : 0;

  const countItms = [
    { type: 'all', amount: allItems },
    { type: 'done', amount: doneItems },
  ];
  return (
    <div className="row d-flex flex-column align-items-center">
      <div className="d-flex flex-row justify-content-between">
        <h2 className="mt-2">Todo List</h2>
        <ColorMode mode={colorMode} onChangeMode={onChangeMode} />

        <button
          onClick={() => auth.signOut()}
          id="signOut"
          className="btn google"
          title="Sign out"
        >
          <i class="fas fa-sign-out-alt"></i>
        </button>
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
  );
};

export default Home;
