import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link, usePage} from '@inertiajs/react';
import moment from "moment";
import {Button} from "@headlessui/react";
import SecondaryButton from "@/Components/SecondaryButton.jsx";
import DangerButton from "@/Components/DangerButton.jsx";
import Modal from "@/Components/Modal.jsx";
import { useState } from 'react';

export default function List({
    taskData,
    sharedTasks
 }) {
    const [confirmingTaskDeletion, setConfirmingTaskDeletion] = useState(false);
    const [processing, setProcessing] = useState(false);

    const closeModal = () => {
        setConfirmingTaskDeletion(false);
        setProcessing(false);
    };

    const confirmTaskDeletion = (id) => {
        setConfirmingTaskDeletion(true);
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="pt-1 flex">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Task List
                    </h2>
                    <Link href={route('task.add')} className="btn-share  ml-3">
                        Add
                    </Link>
                </div>
            }
        >
            <Head title="Task" />
            <div className="py-12">
                 <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                         <div className="flex flex-col">
                             <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                                 {taskData.length > 0 && (
                                     <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                                         <div className="overflow-hidden">
                                             <table
                                                 className="min-w-full text-left text-sm font-light text-surface dark:text-white">
                                                 <thead
                                                     className="border-b border-neutral-200 font-medium dark:border-white/10">
                                                     <tr>
                                                         <th scope="col" className="px-6 py-4">Title</th>
                                                         <th scope="col" className="px-6 py-4">Description</th>
                                                         <th scope="col" className="px-6 py-4">Completed</th>
                                                         <th scope="col" className="px-6 py-4">Created at</th>
                                                         <th scope="col" className="px-6 py-4">Actions</th>
                                                     </tr>
                                                 </thead>
                                                 <tbody>
                                                     {taskData && taskData.map((task) => (
                                                         <tr className="border-b border-neutral-200 dark:border-white/10" key={task.id}>
                                                             <td className="whitespace-nowrap px-6 py-4">{task.title}</td>
                                                             <td className="whitespace-nowrap px-6 py-4">{task.description.substring(0, 50)}...</td>
                                                             <td className="whitespace-nowrap px-6 py-4">{task.completed ? '✅' : ''}</td>
                                                             <td className="whitespace-nowrap px-6 py-4 font-medium">
                                                                 {moment(task.created_at).format('DD/MM/YYYY, HH:mm:ss')}
                                                             </td>
                                                             <td>
                                                                 <Link href={route('task.edit', task.id)} className="btn-edit">
                                                                     Edit
                                                                 </Link>
                                                                 <Link href={route('task.share', task.id)} className="btn-share  ml-3">
                                                                     Share
                                                                 </Link>
                                                                 <Button
                                                                     onClick={() => {
                                                                         confirmTaskDeletion(task.id)
                                                                     }}
                                                                     className="btn-delete ml-3">
                                                                     Delete
                                                                 </Button>
                                                             </td>
                                                         </tr>
                                                     ))}
                                                 </tbody>
                                             </table>
                                             <Modal id="deleteConfirmation" show={confirmingTaskDeletion} onClose={closeModal}>
                                                 <form  className="p-6">
                                                     <h2 className="text-lg font-medium text-gray-900">
                                                         Are you sure you want to delete task?
                                                     </h2>

                                                     <div className="mt-6 flex justify-end">
                                                         <SecondaryButton onClick={closeModal}>
                                                             Cancel
                                                         </SecondaryButton>

                                                         <DangerButton className="ms-3"
                                                                       onClick={() => {
                                                                           console.log('Delete')
                                                                       }}
                                                                       disabled={processing}>
                                                             Delete Task
                                                         </DangerButton>
                                                     </div>
                                                 </form>
                                             </Modal>
                                         </div>
                                     </div>
                                 )}
                                 {sharedTasks.length > 0 && (
                                     <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                                         <h2 className="text-xl font-semibold leading-tight text-gray-800">
                                             Shared Task
                                         </h2>
                                         <div className="overflow-hidden">
                                             <table
                                                 className="min-w-full text-left text-sm font-light text-surface dark:text-white">
                                                 <thead
                                                     className="border-b border-neutral-200 font-medium dark:border-white/10">
                                                     <tr>
                                                         <th scope="col" className="px-6 py-4">Title</th>
                                                         <th scope="col" className="px-6 py-4">Description</th>
                                                         <th scope="col" className="px-6 py-4">Completed</th>
                                                         <th scope="col" className="px-6 py-4">Created at</th>
                                                         <th scope="col" className="px-6 py-4">Actions</th>
                                                     </tr>
                                                 </thead>
                                                 <tbody>
                                                     {sharedTasks && sharedTasks.map((task) => (
                                                         <tr className="border-b border-neutral-200 dark:border-white/10" key={task.id}>
                                                             <td className="whitespace-nowrap px-6 py-4">{task.title}</td>
                                                             <td className="whitespace-nowrap px-6 py-4">{task.description.substring(0, 50)}...</td>
                                                             <td className="whitespace-nowrap px-6 py-4">{task.completed ? '✅' : ''}</td>
                                                             <td className="whitespace-nowrap px-6 py-4 font-medium">
                                                                 {moment(task.created_at).format('DD/MM/YYYY, HH:mm:ss')}
                                                             </td>
                                                             <td>
                                                                 <Link href={route('task.view', task.id)} className="btn-view mr-3">
                                                                     View
                                                                 </Link>
                                                                 {task.read_only && (
                                                                     <Link href={route('task.view', task.id)} className="btn-edit">
                                                                         Edit
                                                                     </Link>
                                                                 )}
                                                             </td>
                                                         </tr>
                                                     ))}
                                                 </tbody>
                                             </table>
                                         </div>
                                     </div>
                                 )}
                             </div>
                         </div>
                    </div>
                 </div>
            </div>


        </AuthenticatedLayout>
    );
}
