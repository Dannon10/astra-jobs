export interface Job {
    id: number;
    title: string;
    company: string;
    location: string;
    type: string;
    description: string;
    requirements: string[];
    postedAt: string;
    salary: string;
    skills?: string[];
}
