'use client';

import { notFound } from "next/navigation";
import { Job } from "@/types/job";
import { fetchJobs } from "@/lib/fetchJobs";
import Link from "next/link";
import { HiOutlineOfficeBuilding } from 'react-icons/hi';
import { MdOutlineLocationOn } from 'react-icons/md';
import styles from './JobDetail.module.css';

interface JobDetailProps {
    params: Promise<{
        id: string;
    }>;
}

export const dynamicParams = true;

export default async function JobDetail({ params }: JobDetailProps) {
    const { id } = await params; 

    const jobs: Job[] = await fetchJobs();
    const job = jobs.find(job => String(job.id) === id);

    if (!job) {
        notFound();
    }

    const jobTypeClassMap: Record<string, string> = {
        internship: `${styles.jobType} ${styles.internship}`,
        'full-time': `${styles.jobType} ${styles.fulltime}`,
        'part-time': `${styles.jobType} ${styles.parttime}`,
        contract: `${styles.jobType} ${styles.contract}`
    };

    return (
        <div className={`${styles.jobDetailContainer} job-detail-container`}>
            <div className={styles.jobDetailContent}>
                <header className={`filter-header ${styles.filterHeader} ${styles.det}`}>
                    <h2>Jobs Details</h2>
                    <div className={`${styles.backButton} back-button`}>
                        <Link href="/"><button className="home-btn">Home</button></Link>
                    </div>
                </header>

                <div className={`${styles.jobHead} ${styles.det} job-head`}>
                    <span className={`${styles.jobTitle} job-title`}>
                        <h1>{job.title}</h1>
                        <div className={`${styles.jobCompanyLocation} job-company-location`}>
                            <HiOutlineOfficeBuilding size={30} />
                            <p>{job.company}</p>
                            <p className={`${styles.jobLocation} job-location`}>
                                <MdOutlineLocationOn size={20} /> {job.location}
                            </p>
                        </div>
                    </span>
                    <span className={jobTypeClassMap[job.type.toLowerCase()] || `${styles.jobType} job-type`}>
                        {job.type}
                    </span>
                </div>

                <div className={`${styles.jobMeta} ${styles.det} job-meta`}>
                    <p><strong>Salary:</strong> {job.salary}</p>
                    <p><strong>Posted At:</strong> {job.postedAt}</p>
                </div>

                <div className={`${styles.jobDescription} ${styles.det} job-description`}>
                    <h2>Job Description</h2>
                    <p>{job.description}</p>
                </div>

                <div className={`${styles.requirements} ${styles.det} requirements`}>
                    <h2>Requirements</h2>
                    <ul>
                        {job.requirements?.map((req, i) => <li key={i}>{req}</li>)}
                    </ul>
                </div>

                <div className={`${styles.skills} ${styles.det} skills`}>
                    <h2>Skill Required</h2>
                    <ul>
                        {job.skills?.map((skill, i) => <li key={i}>{skill}</li>)}
                    </ul>
                </div>
            </div>
        </div>
    );
}
