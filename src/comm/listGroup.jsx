import React from "react";
const ListGroup = ({
  items,
  valueProperty,
  textProperty,
  genreOnSelect,
  selectedItem,
}) => {
  return (
    <div>
      <ul className="list-group">
        {items.map((item) => (
          <li
            onClick={() => {
              genreOnSelect(item);
            }}
            key={item[valueProperty]}
            className={
              item === selectedItem
                ? "list-group-item active"
                : "list-group-item"
            }
          >
            {item[textProperty]}
          </li>
        ))}
      </ul>
    </div>
  );
};
ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default ListGroup;
