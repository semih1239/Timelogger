export interface TimeRegistrations {
    id?: number;
    project_id: number | null;
    time?: number;
    description?: string;
    date?: Date;
}

export interface Project {
    id: number;
    name: string;
    time_registrations: [TimeRegistrations];
    deadline: Date;
    status: boolean;
}


export const INPUT = "input"
