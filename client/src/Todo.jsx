export default function Todo(props) {
    const updateTodo = async (todoId, todoStatus) => {
        const res = await fetch(`/api/todos/${todoId}`, {
            method: "PUT",
            body: JSON.stringify({ status: todoStatus }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const json = await res.json();

        if (json.acknowledged) {
            props.setTodos(currentTodos => {
                return currentTodos
                .map((currentTodo) => {
                    if (currentTodo._id === todoId) {
                        return { ...currentTodo, status: !currentTodo.status }
                    }
                    return currentTodo;
                });
            })
            
        }
    }
    return (
        <div className="todo">
        <p>{props.todo.todo}</p>
        <div>
            <button
                className="todo__status"
                onClick={() => updateTodo(props.todo._id, props.todo.status)}
            >
                {(props.todo.status) ? "☑" : "☐"}
            </button>
            <button
                    className="todo__delete"
                    onClick={() => deleteTodo(props.todo._id)}
                >
                    🗑️
                </button>
        </div>
    </div>
)
  }