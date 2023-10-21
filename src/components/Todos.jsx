import  { useState, useEffect, useRef } from "react";
import Todo from "./Todo"; 
import { ToastContainer, toast } from "react-toastify";
import Modal from "react-modal";
import "./Todos.scss";

const minLength = 3;

function Todos() {
  const [todo, setTodo] = useState("");
  const [search, setSearch] = useState("");
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );
  const [edit, setEdit] = useState(false);
  const [isDelete, setDelete] = useState(false);
  const [clear, setClear] = useState(false);
  const [id, setID] = useState(null);
  const [modal, setModal] = useState(false); 

  const setToLocalStorage = (name, data) => {
    localStorage.setItem(name, JSON.stringify(data));
  };

  let todoWrapper = useRef(null);

  useEffect(() => {
    document.body.classList[modal ? "add" : "remove"]("overflow-hidden");
  });

  useEffect(() => {
    const filteredTodos = todos.filter((todo) => {
      return todo.title.includes(search.trim());
    });

    setFilteredTodos(filteredTodos);
  }, [todos, search]);

  useEffect(() => {
    setToLocalStorage("todos", todos);
 
  }, [todos]);

  const addItem = () => {
    const newTodo = {
      id: new Date().getTime(),
      title: todo.trim(),
      done: false,
    };
    setTodos([...todos, newTodo]);
  };

  const editItem = () => {
    const newTodos = todos.map((td) => {
      if (td.id !== id) {
        return td;
      } else {
        return {
          ...td,
          title: todo,
        };
      }
    });
    setTodos(newTodos);
    setEdit(false);
  };

  const removeItem = () => {
    toast.success(`Item Removed Successfully!`, {
      position: "top-center",
      autoClose: 3200,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
    setDelete(false);
  };

  const confimationConfirm = () => {
    if (edit) {
      const input = todoWrapper.current.querySelector(".form-input");
      setTimeout(() => {
        input.focus();
        input.select();
      }, 0);
    }
    if (isDelete) {
      removeItem();
    }
    if (clear) {
      setTodos([]);
    }
    setModal(false);
  };

  const confimationCancel = () => {
    setTodo("");
    setClear(false);
    setDelete(false);
    setEdit(false);
    setModal(false);
  };

  const toggleItem = (id) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        // todo.done =  !todo.done
        // return todo;
        return { ...todo, done: !todo.done };
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todo.trim().length < minLength) {
      toast.error(`needed at least ${minLength} letters.`, {
        position: "top-center",
        autoClose: 3200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return
    } else if (edit) {
      editItem();
      toast.success(`Item Edited Successfully!`, {
        position: "top-center",
        autoClose: 3200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      addItem();

      toast.success(`Item Added Successfully!`, {
        position: "top-center",
        autoClose: 3200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    setTodo("");
  };

  return (
    <section className="section-center" ref={todoWrapper}>
      <ToastContainer />
      <Modal
        isOpen={modal}
        className="confirmation-modal"
        // onAfterOpen={afterOpenModal}
        // onRequestClose={closeModal}
        // style={customStyles}
        // contentLabel="Example Modal"
      >
        <div className="cm-inner">
          <h4>Are you sure ?</h4>
          <button className="btn" onClick={confimationConfirm}>
            Yes
          </button>
          <button className="btn" onClick={confimationCancel}>
            no
          </button>
        </div>
      </Modal>
      <form onSubmit={handleSubmit}>
        <h4>Task Manager</h4>
        <div className="form-control">
          <input
            type="text"
            onChange={(e) => setTodo(e.target.value.toLowerCase())}
            className="form-input"
            value={todo}
          />
          <button type="submit" className="btn">
            {edit ? "Edit Item" : "add item"}
          </button>
        </div>
      </form> 
      {!filteredTodos.length && todos.length ? (
        <div className="not-found">Not Found</div>
      ) : (
        <div className="items">
          {filteredTodos.map((todo, i) => {
            const props = {
              ...todo,
              setEdit,
              setDelete,
              setTodo,
              setModal,
              setID,
              toggleItem,
            };
            return <Todo key={todo.id} {...props} />;
          })}
        </div>
      )}
      {!!todos.length && (
        <>
          {!!filteredTodos.length && (
            <button
              onClick={() => {
                setClear(true);
                setModal(true);
              }}
              className="btn clear-btn"
            >
              Clear Items
            </button>
          )}

          <div className="form-control">
            <input
              type="text"
              onChange={(e) => setSearch(e.target.value.toLowerCase())}
              className="form-input"
              value={search}
            />
            <button type="button" className="btn">
              Search
            </button>
          </div>
        </>
      )}
    </section>
  );
}

export default Todos;
