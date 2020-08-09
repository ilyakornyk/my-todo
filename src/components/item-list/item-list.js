import React from "react";
import { Draggable } from "react-beautiful-dnd";

import "./item-list.css";
import cx from "classnames";
const ItemList = ({
  label,
  id,
  important,
  index,
  done,
  onImportant,
  onDelete,
  onDone,
}) => {
  const cn = cx({ ["text-primary"]: important, ["done"]: done });
  return (
    <Draggable draggableId={String(id)} index={index}>
      {(provided) => (
        <li
          id={id}
          className="list-group-item col-12 mt-2 d-flex justify-content-between align-items-center"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <span className={cn} onClick={onDone}>
            {label}
          </span>
          <div className="buttons d-flex justify-content-around">
            <button
              type="button"
              className="btn btn-sm btn-success"
              alt="important"
              onClick={onImportant}
            >
              <i className="material-icons">grade</i>
            </button>

            <button
              type="button"
              className="btn btn-sm btn-danger ml-2"
              alt="delete"
              onClick={onDelete}
            >
              <i className="material-icons">clear</i>
            </button>
          </div>
        </li>
      )}
    </Draggable>
  );
};

export default ItemList;
