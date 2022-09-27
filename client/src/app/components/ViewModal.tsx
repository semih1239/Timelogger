import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import axios from "axios";
import { Project, Time_registrations } from "../interface";
import moment from "moment";

interface ViewModal {
    setViewModal: React.Dispatch<React.SetStateAction<boolean>>;
    modalProjectId: number | undefined;
}

const timeChanger = (time: Date) => {
    return moment(time).format("DD-MM-YYYY HH-MM")
}

export default function ViewModal(props: ViewModal) {
    const [project, setProject] = useState<Project>()

    useEffect(() => {
        axios(`http://localhost:3001/api/projects/${props.modalProjectId}`).then(res => setProject(res.data))
    }, [])

    const entryModalBody =
        (<div className="mt-2">
            <ol className="space-y-4 list-decimal list-inside text-black-500 dark:text-black-400">
                {project && project.time_registrations.map((time_registration: Time_registrations) => {
                    return <li>
                        {time_registration.description}
                        <ul className="pl-5 mt-2 space-y-1 list-disc list-inside">
                            <li>Date : {time_registration.date && timeChanger(time_registration.date)}</li>
                            <li>Work Time {time_registration.time} minutes</li>
                        </ul>
                    </li>
                })}
            </ol>
        </div>)

    return (
        <Modal open={true} setOpen={props.setViewModal} title="View of Project" modalBody={entryModalBody} />
    )
}
