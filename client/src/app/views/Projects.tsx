import React, { useState } from "react";
import Table from "../components/Table";
import { Project } from "../interface";
import Modal from "../components/Modal";
import useFetch from "../hooks/useFetch";
import { BASE_URL } from "../api/projects";

export default function Projects() {
    const [modalProjectId, setModalProjectId] = useState<number | null>(null)
    const [modal, setModal] = useState<boolean>(false)
    const [modalType, setModalType] = useState<string>('')

    const { loading, error, data, setData } = useFetch(`${BASE_URL}/projects`)
    const projects = data as Project[]

    const handleSort = () => {
        if (projects.length > 1 && projects[0].id > projects[1].id) {
            const sortedData = [...projects].sort((a, b) => {
                return Date.parse(`${a.id}`) > Date.parse(`${b.id}`) ? 1 : -1;
            });
            return setData(sortedData);
        }

        const sortedData = [...projects].sort((a, b) => {
            return Date.parse(`${a.deadline}`) > Date.parse(`${b.deadline}`) ? 1 : -1;
        });
        setData(sortedData);
    }

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error!</div>

    return (
        <>
            <div className="flex items-center my-6">
                <div className="w-1/2">
                    <button onClick={handleSort} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Sort By Deadline
                    </button>
                </div>

                <div className="w-1/2 flex justify-end">
                    <form>
                        <input
                            className="border rounded-full py-2 px-4"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                        />
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white rounded-full py-2 px-4 ml-2"
                            type="submit"
                        >
                            Search
                        </button>
                    </form>
                </div>
            </div>

            <Table projects={projects} setModal={setModal} setModalType={setModalType} setModalProjectId={setModalProjectId} />
            {modal && <Modal setModal={setModal} modalProjectId={modalProjectId} type={modalType} />}
        </>
    );
}
