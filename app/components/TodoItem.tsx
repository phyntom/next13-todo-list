'use client';

type TodoItemProps = {
	id: string;
	title: string;
	complete: boolean;
	toggleTodo: (id: string, complet: boolean) => void;
};

function TodoItem({ id, title, complete, toggleTodo }: TodoItemProps) {
	return (
		<li className='flex gap-1 items-center border-b border-b-amber-500 m-2 py-5'>
			<input id={id} type='checkbox' className='cursor-pointer peer' defaultChecked={complete} onChange={(e) => toggleTodo(id, e.target.checked)} />
			<label htmlFor={id} className='peer-checked:line-through peer-checked:text-slate-500'>
				{title}
			</label>
		</li>
	);
}

export default TodoItem;
