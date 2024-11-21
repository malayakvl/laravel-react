import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, usePage} from '@inertiajs/react';
import EditTaskForm from "@/Pages/Task/Partials/EditForm.jsx";

export default function Edit({
 taskData,
 usersData
}) {
    return (
        <AuthenticatedLayout
            header={
                <div className="pt-1">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Task View
                    </h2>
                </div>
            }
        >
            <Head title="Task Edit" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <div className="mb-2"><b>Title:</b> {taskData[0].title}</div>
                        <div className="mb-2"><b>Description:</b>
                            <span className="block">{taskData[0].description}</span>
                        </div>
                    </div>
                </div>
            </div>


        </AuthenticatedLayout>
    );
}
