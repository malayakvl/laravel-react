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
                        Task Edit
                    </h2>
                </div>
            }
        >
            <Head title="Task Edit" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <EditTaskForm
                            formData={taskData[0]}
                            usersData={usersData}
                            className="max-w-xl"
                        />
                    </div>

                </div>
            </div>


        </AuthenticatedLayout>
    );
}
