import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "../components/Table";
import RegisterTime from "../components/RegisterTime";
import { Project } from "../interface";
import ViewModal from "../components/ViewModal";

export default function Projects() {
    const [projects, setProjects] = useState<Project[] | undefined>()
    const [modalProjectId, setModalProjectId] = useState<number | undefined>()
    const [addRegistrationModal, setAddRegistrationModal] = useState<boolean>(false);
    const [viewModal, setViewModal] = useState<boolean>(false)

    useEffect(() => {
        axios("http://localhost:3001/api/projects").then((res) => {
            setProjects(res.data)
        })
    }, [])

    return (
        <>
            <div className="flex items-center my-6">
                <div className="w-1/2">
                    <button onClick={() => setAddRegistrationModal(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Add entry
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

            <Table projects={projects} setAddRegistrationModal={setAddRegistrationModal} setModalProject={setModalProjectId} setViewModal={setViewModal} />
            {addRegistrationModal && <RegisterTime setAddRegistrationModal={setAddRegistrationModal} modalProjectId={modalProjectId} />}
            {viewModal && <ViewModal setViewModal={setViewModal} modalProjectId={modalProjectId} />}
        </>
    );
}
