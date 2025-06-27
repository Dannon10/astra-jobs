'use client';

import React from 'react';
import { Job } from '../types/job';
import Link from 'next/link';
import { MdOutlineLocationOn } from 'react-icons/md';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';
import styles from './JobCard.module.css';

interface JobCardProps {
    job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {

    const rawType = job.type.toLowerCase().replace('-', '');
const typeClass = styles[rawType] || '';
    return (
        <div className={`job-card ${styles.jobCard}`}>
            <Link href={`/job/${job.id}`}>
                <div className={`job-card-details ${styles.jobCardDetails}`}>
                    <div className={`job-card-header ${styles.jobCardHeader}`}>
                        <h3 className={`job-title ${styles.jobTitle}`}>{job.title}</h3>
                        <span className={`job-type ${styles.jobType} ${typeClass} ${rawType}`}>
                            {job.type}
                        </span>
                    </div>

                    <p className={`job-salary ${styles.jobSalary}`}>Salary: {job.salary}</p>

                    <div className={`job-company ${styles.jobCompany}`}>
                        <HiOutlineOfficeBuilding size={20} color="#6B7280" />
                        {job.company}
                    </div>

                    <div className={`job-location ${styles.jobLocation}`}>
                        <MdOutlineLocationOn size={15} />
                        {job.location}
                    </div>

                    <p className={`job-posted ${styles.jobPosted}`}>
                        Posted on {job.postedAt}
                    </p>
                </div>
            </Link>
        </div>

    );
};

export default JobCard;




