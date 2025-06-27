'use client';

import { useState, useRef, useEffect } from 'react';
import JobCard from './JobCard';
import { Job } from '../types/job';
import { MdTune } from 'react-icons/md';
import gsap from 'gsap';
import styles from './JobFilter.module.css';

interface JobFilterProps {
    jobs: Job[];
    allJobs: Job[];
    selectedTypes: string[];
    setSelectedTypes: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function JobFilter({
    jobs,
    allJobs,
    selectedTypes,
    setSelectedTypes
}: JobFilterProps) {
    const [filterDropdown, setFilterDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const jobListRef = useRef<HTMLDivElement>(null);

    const jobTypes = Array.from(new Set(allJobs.map(job => job.type)));

    const toggleType = (type: string) => {
        setSelectedTypes(prev =>
            prev.includes(type)
                ? prev.filter(t => t !== type)
                : [...prev, type]
        );
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                buttonRef.current &&
                !dropdownRef.current.contains(event.target as Node) &&
                !buttonRef.current.contains(event.target as Node)
            ) {
                setFilterDropdown(false);
            }
        };

        if (filterDropdown) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [filterDropdown]);

    useEffect(() => {
        if (jobListRef.current) {
            gsap.fromTo(
                jobListRef.current.children,
                { opacity: 0, y: 10 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.2,
                    stagger: 0.05,
                    ease: 'power4.out'
                }
            );
        }
    }, [jobs]);

    return (
        <div className={`job-filter-container ${styles.jobFilterContainer}`}>
            <header className={`filter-header ${styles.filterHeader}`}>
                <h2>Find Jobs</h2>

                <div className={`filter ${styles.filter}`}>
                    <button
                        ref={buttonRef}
                        onClick={() => setFilterDropdown(prev => !prev)}
                        className={`filter-button ${styles.filterButton}`}
                    >
                        <MdTune size={20} title="Filter job types" />
                        <span>Filters</span>
                    </button>

                    <div
                        ref={dropdownRef}
                        className={`filter-dropdown ${styles.filterDropdown} ${filterDropdown
                                ? `filter-dropdown--open ${styles.filterDropdownOpen}`
                                : `filter-dropdown--closed ${styles.filterDropdownClosed}`
                            }`}
                    >
                        {jobTypes.map(type => (
                            <label
                                key={type}
                                className={`filter-checkbox ${styles.filterCheckbox}`}
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedTypes.includes(type)}
                                    onChange={() => toggleType(type)}
                                />
                                {type}
                            </label>
                        ))}
                    </div>
                </div>
            </header>

            <div className={`job-list ${styles.jobList}`} ref={jobListRef}>
                {jobs.length === 0 ? (
                    <div className='no-jobs-message'>
                        <p>No jobs found for selected keyword!!.</p>
                    </div>
                ) : (
                    jobs.map(job => <JobCard key={job.id} job={job} />)
                )}
            </div>
        </div>

    );
}
