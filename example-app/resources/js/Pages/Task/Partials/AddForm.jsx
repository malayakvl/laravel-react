import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import TextArea from '@/Components/TexArea';
import InputSelect from '@/Components/InputSelect';
import Checkbox from "@/Components/Checkbox.jsx";
import { Transition } from '@headlessui/react';
import {useForm, usePage} from '@inertiajs/react';
import { useRef } from 'react';

export default function AddTaskForm({ formData, usersData, className }) {
    const titleInput = useRef();
    const descriptionInput = useRef();
    const assignToInput = useRef();
    const taskId = formData.id;

    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            title: formData.title,
            description: formData.description,
            asign_to: formData.asign_to,
            completed: formData.completed,
            id: formData.id
        });
    const submit = (e) => {
        e.preventDefault();

        post(route('task.create'));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Add Task
                </h2>

            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel
                        htmlFor="title"
                        value="Title"
                    />

                    <TextInput
                        id="title"
                        value={data.title}
                        onChange={(e) => {
                            setData('title', e.target.value)
                        }}
                        type="text"
                        className="mt-1 block w-full"
                    />

                    <InputError
                        message={errors.title}
                        className="mt-2"
                    />
                </div>

                <div>
                    <InputLabel
                        htmlFor="title"
                        value="Description"
                    />

                    <TextArea
                        id="description"
                        value={data.description}
                        onChange={(e) =>
                            setData('description', e.target.value)
                        }
                        type="text"
                        className="mt-1 block w-full"
                    />

                    <InputError
                        message={errors.description}
                        className="mt-2"
                    />
                </div>

                <div>
                    <InputLabel
                        htmlFor="assignto"
                        value="Share With"
                    />

                    <InputSelect
                        id="asign_to"
                        ref={assignToInput}
                        onChange={(e) =>
                            setData('asign_to', e.target.value)
                        }
                        dataList={usersData}
                        selectedOptionId={formData.asign_to}
                        className="mt-1 block w-full"
                    />

                </div>

                <div>
                    <Checkbox
                        name="completed"
                        checked={data.completed}
                        onChange={(e) =>
                            setData('completed', e.target.checked)
                        }
                    />
                    <span className="ms-2 text-sm text-gray-600">
                        Completed
                    </span>


                    <InputError
                        message={errors.title}
                        className="mt-2"
                    />
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">
                            Saved.
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
