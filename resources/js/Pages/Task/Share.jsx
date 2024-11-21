import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, useForm} from '@inertiajs/react';
import Checkbox from "@/Components/Checkbox.jsx";
import { useState } from 'react';
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import {Transition} from "@headlessui/react";
import { router } from '@inertiajs/react'


export default function Share({
     taskData,
     usersData
 }) {
    const [checkedIds, setCheckedIds] = useState([]);
    const [readOnlyIds, setReadOnlyIds] = useState([]);
    const [showPermission, setShowPermission] = useState(false);
    const [disabledPermissionIds, setSetDisabledPermissionIds] = useState([]);
    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            ids: JSON.stringify(checkedIds),
            readOnlyIds: JSON.stringify(readOnlyIds)

        });
    const checkUserData = (id, el) => {
        const tmpChecked = checkedIds;
        if (el.checked) {
            tmpChecked.push({id: id, checked: el.checked, readOnly: false});
        } else {
            const index = tmpChecked.indexOf(id);
            if (index > -1) { // only splice array when item is found
                tmpChecked.splice(index, 1); // 2nd parameter means remove one item only
            }
            setCheckedIds(tmpChecked);
        }
    }

    const checkReadOnlyData = (id, el) => {
        const tmpChecked = readOnlyIds;
        if (el.checked) {
            checkedIds.find(el => el.id === id ? el.readOnly = true : el.readOnly = false);
        } else {
            const index = tmpChecked.indexOf(id);
            if (index > -1) { // only splice array when item is found
                tmpChecked.splice(index, 1); // 2nd parameter means remove one item only
            }
            setReadOnlyIds(tmpChecked);
        }
    }


    const renderShowPermission = (itemId, elChecked) => {
        console.log('Render permission', elChecked)
        if (elChecked) {
            return (
                <>
                    <div className={`pl-5`}>
                        <Checkbox
                            name={`readonly_${itemId}`}
                            id={`redonly_${itemId}`}
                            checked={readOnlyIds.find((checked) => checked.id === itemId) }
                            onChange={(e) =>
                                checkReadOnlyData(itemId, e.target)
                            }
                        />
                        <label htmlFor={`readonly_${itemId}`} className="ms-2 text-sm text-gray-600">Read Only</label>
                    </div>
                </>
            )
        } else {
            return (<></>)
        }
    }

    const submit = (e) => {
        e.preventDefault();

        router.post('/share', {
            ids: JSON.stringify(checkedIds),
            readOnlyIds: JSON.stringify(readOnlyIds),
            taskId: taskData[0].id
        })
    };

    const renderUsersList = (users) => {
        return (
            <>
                {users?.map((item) => (
                    <li key={item.id} className="flex flex-row mb-4">
                        <div>
                            <Checkbox
                                name={`share_${item.id}`}
                                id={item.id}
                                checked={checkedIds.find((checked) => checked.id === item.id)}
                                onChange={(e) =>
                                    checkUserData(item.id, e.target)
                                }
                            />
                            <label htmlFor={item.id} className="ms-2 text-sm text-gray-600">{item.name}</label>
                        </div>
                        <div className={`pl-5`}>
                            <Checkbox
                                name={`0${item.id}`}
                                id={`0${item.id}`}
                                checked={readOnlyIds.find((checked) => checked.id === item.id) }
                                onChange={(e) =>
                                    checkReadOnlyData(item.id, e.target)
                                }
                            />
                            <label htmlFor={`0${item.id}`} className="ms-2 text-sm text-gray-600">Read Only</label>
                        </div>
                    </li>
                ))}
            </>
        )
    }

    return (
        <AuthenticatedLayout
            header={
                <div className="pt-1">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Task Share «{taskData[0].title}» {usersData.length}
                    </h2>
                </div>
            }
        >
            <Head title="Task Share" />
            <div className="py-12">
                <form onSubmit={submit} className="mt-6 space-y-6">
                    <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <ul>
                            {renderUsersList(usersData)}
                        </ul>
                    </div>
                    <div className="flex items-center gap-4">
                        <PrimaryButton disabled={processing}>Share</PrimaryButton>

                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm text-gray-600">
                                Share.
                            </p>
                        </Transition>
                    </div>

                </div>
                </form>
            </div>


        </AuthenticatedLayout>
    );
}
