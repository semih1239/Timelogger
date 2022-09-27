export interface Time_registrations {
    project_id: number | undefined;
    time?: number;
    description?: string;
    date?: Date;
}

export interface Project {
    id: number;
    name: string;
    time_registrations: [Time_registrations];
    deadline: Date;
    status: boolean;
}

