import React, { ReactElement } from "react";
import moment from "moment";
import { INPUT, Project } from "../interface";

interface Prop {
    projects: Project[];
    setModalProjectId: React.Dispatch<React.SetStateAction<number | null>>;
    setModalType: React.Dispatch<React.SetStateAction<string>>;
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const timeChanger = (time: Date) => {
    return moment(time).format("DD-MM-YYYY HH:MM")
}

const thead = ["ID", "Project Name", "Time Spent (hour)", "Deadline", "Status", "Action"]

export default function Table({ projects, setModalProjectId, setModalType, setModal }: Prop) {

    const spendedTime = (registrations: object[]): string => {
        const sum = registrations.reduce((accumulator, object: any) => {
            return accumulator + object.time;
        }, 0);

        const minutes = sum % 60;
        const hours = Math.floor(sum / 60);
        return `${hours}:${minutes}`;
    }

    return (
        <table className="table-fixed w-full">
            <thead className="bg-gray-200">
                <tr>
                    {thead.map(head => (<th className={`border px-4 py-2 ${head === thead[0] ? "w-12" : null}`} key={head}>{head}</th>))}
                </tr>
            </thead>
            <tbody>
                {projects && projects.map((project): ReactElement => {
                    return <tr key={project.id}>
                        <td className="border px-4 py-2 w-12">{project.id}</td>
                        <td className="border px-4 py-2">{project.name}</td>
                        <td className="border px-4 py-2">{spendedTime(project.time_registrations)}</td>
                        <td className="border px-4 py-2">{timeChanger(project.deadline)}</td>
                        <td className="border px-4 py-2">{project.status ? "Done" : "On Process"}</td>
                        <td className="border px-4 py-2 flex justify-around" >
                            {!project.status && <button className={"text-blue-900 font-bold"}
                                onClick={() => {
                                    setModalProjectId(project.id);
                                    setModalType(INPUT)
                                    setModal(true);
                                }}>
                                Add Entry
                            </button>}
                            <button className="text-blue-900 font-bold"
                                onClick={() => {
                                    setModalProjectId(project.id);
                                    setModalType("text")
                                    setModal(true);
                                }}>
                                View
                            </button>
                        </td>
                    </tr>
                })}
            </tbody>
        </table>
    );
}
