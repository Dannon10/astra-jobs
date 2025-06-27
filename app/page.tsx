'use client';

import Navbar from '../components/Navbar';
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { fetchJobs } from '../lib/fetchJobs';
import JobFilter from '../components/JobFilter';
import { Job } from '../types/job';
import { SyncLoader } from 'react-spinners'

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialQuery = searchParams.get('search') || '';
  const initialFilters = searchParams.get('filters')?.split(',') || [];

  const [selectedTypes, setSelectedTypes] = useState<string[]>(initialFilters);
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (searchQuery) {
      params.set('search', searchQuery);
    } else {
      params.delete('search');
    }

    if (selectedTypes.length > 0) {
      params.set('filters', selectedTypes.join(','));
    } else {
      params.delete('filters');
    }

    router.replace(`/?${params.toString()}`);
  }, [searchQuery, selectedTypes, router, searchParams]); // Added missing dependencies

  useEffect(() => {
    fetchJobs().then(data => setJobs(data));
  }, []);

  const filteredJobs = jobs.filter(job => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType =
      selectedTypes.length === 0 || selectedTypes.includes(job.type);

    return matchesSearch && matchesType;
  });

  return (
    <main>
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      {jobs.length === 0 ? (
        <div className="loading">
        <SyncLoader/>
        </div>
      ) : (
        <JobFilter
          jobs={filteredJobs}
          allJobs={jobs}        
          selectedTypes={selectedTypes}
          setSelectedTypes={setSelectedTypes}
        />
      )}
    </main>
  );
}
