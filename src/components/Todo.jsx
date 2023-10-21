function Todo({
  id,
  title,
  setID,
  setTodo,
  setEdit,
  setDelete,
  setModal,
  toggleItem,
  done,
}) { 
  return (
    <div className="single-item">
      <input
        checked={done ? true : false}
        type="checkbox"
        onChange={() => toggleItem(id)}
      />
      <p
        onClick={() => toggleItem(id)}
        style={{
          textDecoration: `${done ? "line-through" : ""} `,
        }}
      >
        {title}
      </p>
      <button
        onClick={() => {
          setEdit(true);
          setID(id);
          setModal(true); 
          setTodo(title);
        }}
        className="btn edit-btn"
        type="button"
      >
        edit
      </button>
      <button
        onClick={() => {
          setDelete(true);
          setID(id);
          setModal(true);
        }}
        className="btn remove-btn"
        type="button"
      >
        delete
      </button>
    </div>
  );
}

export default Todo;
