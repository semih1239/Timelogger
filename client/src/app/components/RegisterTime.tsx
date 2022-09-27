import React, { useState } from "react";
import axios from "axios"
import Modal from "./Modal";

interface Props {
    setAddRegistrationModal: React.Dispatch<React.SetStateAction<boolean>>;
    modalProjectId: number | undefined;
}

interface RegisterValues {
    project_id: number | undefined,
    description?: string,
    time?: number,
}

const RegisterTime = (props: Props) => {
    const { modalProjectId, setAddRegistrationModal } = props;
    const [registerValues, setRegisterValues] = useState<RegisterValues>({ project_id: modalProjectId })

    const onConfirm = () => {
        if (!registerValues.description || !registerValues.time) {
            return alert("Please fill all part")
        }
        else if (registerValues.time < 30) {
            return alert("Work Time cannot be lower then 30 minutes")
        }
        axios.post("http://localhost:3001/api/registrations", registerValues)
            .then(res => {
                res.status === 200 && setAddRegistrationModal(false);
            })
    }

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => setRegisterValues({ ...registerValues, [event.target.id]: event.target.value });

    const entryModalBody =
        (<div className="mt-2">
            <div>
                <label htmlFor="description" className="block m-2 text-sm font-medium text-black-900 dark:text-black-300">Which part will you work?</label>
                <input value={registerValues.description} onChange={onChange} id="description" className="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-5 ring-1 ring-slate-200 shadow-sm" type="text" aria-label="Work Description" placeholder="Work Description..." />
            </div>
            <div>
                <label htmlFor="time" className="block m-2 text-sm font-medium text-black-900 dark:text-black-300">Planned work time (minute)</label>
                <input value={registerValues.time} onChange={onChange} type="number" id="time" className="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-5 ring-1 ring-slate-200 shadow-sm" placeholder="Planned work time (minute)" required />
            </div>

            <p className="text-sm text-gray-500">
                Are you sure you want to deactivate your account? All of your data will be permanently
                removed. This action cannot be undone.
            </p>
        </div>)

    return (
        <Modal open={true} setOpen={setAddRegistrationModal} title="Register Time" modalBody={entryModalBody} onConfirm={onConfirm} />
    )
}

export default RegisterTime;