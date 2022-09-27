import React, { ReactElement } from "react";
// import { Project } from "../interface";
import { Project } from "../interface";

interface Table {
    projects: Project[] | undefined;
    setAddRegistrationModal: React.Dispatch<React.SetStateAction<boolean>>;
    setViewModal: React.Dispatch<React.SetStateAction<boolean>>;
    setModalProject: React.Dispatch<React.SetStateAction<number | undefined>>;
}

export default function Table(props: Table) {

    const spendedTime = (registrations: object[]): number => {
        const sum = registrations.reduce((accumulator, object: any) => {
            return accumulator + object.time;
        }, 0);
        return sum;
    }

    return (
        <table className="table-fixed w-full">
            <thead className="bg-gray-200">
                <tr>
                    <th className="border px-4 py-2 w-12">ID</th>
                    <th className="border px-4 py-2">Project Name</th>
                    <th className="border px-4 py-2">Time Spent (minute)</th>
                    <th className="border px-4 py-2">Deadline</th>
                    <th className="border px-4 py-2">Status</th>
                    <th className="border px-4 py-2">Action</th>
                </tr>
            </thead>
            <tbody>
                {props.projects && props.projects.map((project): ReactElement => {
                    return <tr key={project.id}>
                        <td className="border px-4 py-2 w-12">{project.id}</td>
                        <td className="border px-4 py-2">{project.name}</td>
                        <td className="border px-4 py-2">{spendedTime(project.time_registrations)}</td>
                        <td className="border px-4 py-2">{project.deadline}</td>
                        <td className="border px-4 py-2">{project.status ? "Done" : "On Process"}</td>
                        <td className="border px-4 py-2" style={{ display: "flex", justifyContent: "space-between" }}>
                            <button disabled={project.status} onClick={() => { props.setModalProject(project.id); props.setAddRegistrationModal(true); }}>
                                Add
                            </button>
                            <button onClick={() => { props.setModalProject(project.id); props.setViewModal(true); }}>
                                View
                            </button>
                        </td>
                    </tr>

                })}
                {/* <tr>
                    <td className="border px-4 py-2 w-12">1</td>
                    <td className="border px-4 py-2">Project 1</td>
                    <td className="border px-4 py-2">abc</td>
                    <td className="border px-4 py-2">xyz</td>
                </tr>
                <tr>
                    <td className="border px-4 py-2 w-12">2</td>
                    <td className="border px-4 py-2">Project 2</td>
                    <td className="border px-4 py-2">abc</td>
                    <td className="border px-4 py-2">xyz</td>
                </tr>
                <tr>
                    <td className="border px-4 py-2 w-12">3</td>
                    <td className="border px-4 py-2">Project 3</td>
                    <td className="border px-4 py-2">abc</td>
                    <td className="border px-4 py-2">xyz</td>
                </tr> */}
            </tbody>
        </table>
    );
}
