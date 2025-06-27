import jobs from './jobs.json';
import { Job } from '../types/job';

export async function fetchJobs(): Promise<Job[]> {
    return new Promise((resolve) => {
        setTimeout(() => resolve(jobs), 300);
    });
}
