import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, usePage} from '@inertiajs/react';
import AddTaskForm from "@/Pages/Task/Partials/AddForm.jsx";

export default function Add({
 taskData,
 usersData
}) {
    return (
        <AuthenticatedLayout
            header={
                <div className="pt-1">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Task Add
                    </h2>
                </div>
            }
        >
            <Head title="Task Add" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <AddTaskForm
                            formData={{title:'', description: ''}}
                            usersData={usersData}
                            className="max-w-xl"
                        />
                    </div>

                </div>
            </div>


        </AuthenticatedLayout>
    );
}
