import React, { useState } from 'react'
import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { TimeRegistrations, Project, INPUT } from '../interface';
import axios from 'axios';
import moment from 'moment';
import { BASE_URL } from '../api/projects';
import useFetch from '../hooks/useFetch';

interface Prop {
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
    modalProjectId: number | null;
    type: string;
}

const timeChanger = (time: Date) => {
    return moment(time).format("DD-MM-YYYY HH:MM")
}

export default function Modal({ setModal, modalProjectId, type }: Prop) {
    const cancelButtonRef = useRef(null)
    const [registerValues, setRegisterValues] = useState<TimeRegistrations>({ project_id: modalProjectId, description: '', time: 30 })

    const { data, loading, error } = useFetch(`${BASE_URL}/projects/${modalProjectId}`, type === INPUT ? false : true)
    const project = data as Project

    const onConfirm = () => {
        if (!registerValues.description || !registerValues.time) {
            return alert("Please fill all part")
        }
        else if (registerValues.time < 30) {
            return alert("Work Time cannot be lower then 30 minutes")
        }

        axios.post(`${BASE_URL}/registrations`, registerValues)
            .then(res => {
                if (res.status === 200) setModal(false);
                window.location.reload();
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.id;
        setRegisterValues({ ...registerValues, [name]: event.target.value })
    };

    return (
        <Transition.Root show={true} as={Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start justify-center">
                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-">
                                            <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 p-2">
                                                {type === INPUT ? "Register New Time" : "View of Project"}
                                            </Dialog.Title>
                                            {loading ? "Loading..." : null}
                                            {error ? "Error!" : null}
                                            {type === INPUT ? <div className="mt-2">
                                                <div>
                                                    <label htmlFor="description" className="block m-2 text-sm font-medium text-black-900 dark:text-black-300">Which part will you work?</label>
                                                    <input value={registerValues.description} onChange={onChange} id="description" className="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-5 ring-1 ring-slate-200 shadow-sm" type="text" aria-label="Work Description" placeholder="Work Description..." />
                                                </div>
                                                <div>
                                                    <label htmlFor="time" className="block m-2 text-sm font-medium text-black-900 dark:text-black-300">Planned work time (minute)</label>
                                                    <input value={registerValues.time} min={30} onChange={onChange} type="number" id="time" className="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-5 ring-1 ring-slate-200 shadow-sm" placeholder="Planned work time (minute)" required />
                                                </div>
                                            </div> :
                                                <div className="mt-2 text-center min-h-q">
                                                    <ol className="space-y-4 list-decimal list-inside text-black-500 dark:text-black-400 text-left">
                                                        {project.id && project.time_registrations.map((time_registration: TimeRegistrations) => {
                                                            return <li key={time_registration.id}>
                                                                {time_registration.description}
                                                                <ul className="pl-5 mt-2 space-y-1 list-disc list-inside">
                                                                    <li>Date : {time_registration.date && timeChanger(time_registration.date)}</li>
                                                                    <li>Work Time {time_registration.time} minutes</li>
                                                                </ul>
                                                            </li>
                                                        })}
                                                    </ol>
                                                </div>}
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    {type === INPUT && <button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={onConfirm}
                                    >
                                        Confirm
                                    </button>}
                                    <button
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={() => setModal(false)}
                                        ref={cancelButtonRef}
                                    >
                                        Close
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
