'use client';

import styles from './JobSearch.module.css';
import { ChangeEvent } from 'react';

interface SearchBarProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

export default function SearchBar({ searchQuery, setSearchQuery }: SearchBarProps) {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    return (
        <input
            type="text"
            value={searchQuery}
            onChange={handleChange}
            placeholder="Search jobs or companies..."
            className={`search-bar ${styles.searchBar}`}
        />
    );
}
