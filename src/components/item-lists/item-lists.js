import React, { useState, useEffect } from "react";
import { Droppable } from "react-beautiful-dnd";

import ItemList from "../item-list";

import "./item-lists.css";

const ItemLists = ({ items, onImportant, onDelete, onDone }) => {
  const DROP_ID = "todo-drop";

  // Create list of items
  const renderItems = (items) => {
    if (!!items) {
      return items.map((item, i) => {
        const { id } = item;

        return (
          <ItemList
            key={id}
            {...item}
            onImportant={() => onImportant(id)}
            onDelete={() => onDelete(id)}
            onDone={() => onDone(id)}
            index={i}
          />
        );
      });
    }
  };

  return (
    <Droppable droppableId={DROP_ID}>
      {(provided) => (
        <ul
          className="list-group col-6 container"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <div className="row d-flex flex-column">
            {renderItems(items)}
            {provided.placeholder}
          </div>
        </ul>
      )}
    </Droppable>
  );
};

export default ItemLists;
