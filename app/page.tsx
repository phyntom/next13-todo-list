import Link from "next/link";
import prisma from "./db";
import TodoItem from "./components/TodoItem";

interface Todo {
  id: string;
  title: string;
  complete: boolean;
}

async function getTodos() {
  let todos: Array<Todo> = [];
  try {
    let todos = await prisma.todo.findMany();
    return todos;
  } catch (err) {
    console.error(err);
  }
  return todos;
}

async function createTodo(todos: Todo[]) {
  try {
    for (const todo of todos) {
      await prisma.todo.create({
        data: { title: todo.title, complete: todo.complete },
      });
    }
  } catch (err) {
    console.error(err);
  }
}

async function removeAll() {
  try {
    await prisma.todo.deleteMany();
  } catch (err) {
    console.error(err);
  }
}

async function toggleTodo(id: string, complete: boolean) {
  "use server";
  await prisma.todo.update({ where: { id }, data: { complete } });
  console.log(id, complete);
}

const App = async () => {
  const todos = await getTodos();
  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">Todos</h1>
        <Link
          className="border bolder-slate-50 p-4 rounded text-amber-500 hover:bg-slate-700 focus-within:bg-slate-700"
          href="/new"
        >
          New
        </Link>
      </header>
      <ul className="pl-4">
        {todos.map((todo) => (
          <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo} />
        ))}
      </ul>
    </>
  );
};

export default App;
