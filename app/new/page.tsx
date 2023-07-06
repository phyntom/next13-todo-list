import Link from 'next/link';
import { redirect } from 'next/navigation';
import prisma from '../db';

async function createTodo(data: FormData) {
	'use server';
	const title = data.get('title')?.valueOf();
	if (typeof title === 'string' && title.length > 0) {
		await prisma.todo.create({ data: { title: title, complete: false } });
		console.log('Todo created successfully !!!');
		redirect('/');
	} else {
		throw new Error('Invalid title');
	}
}

export default function Page() {
	return (
		<>
			<header className='flex justify-between items-center mb-4'>
				<h1 className='text-2xl'>New</h1>
			</header>
			<form action={createTodo} className='flex gap-2 flex-col'>
				<input
					type='text'
					name='title'
					className='border border-slate-300 bg-transparent rounded px-2 py-1 outline-none 
                focus-within:border-slate-100'
				/>
				<div className='flex justify-end'>
					<Link href='/' className='border bolder-slate-50 p-4 rounded text-amber-500 hover:bg-slate-700 focus-within:bg-slate-700'>
						Cancel
					</Link>
					<button className='border bolder-slate-50 p-4 rounded text-amber-500 hover:bg-slate-700 focus-within:bg-slate-700'>Create</button>
				</div>
			</form>
		</>
	);
}
