import Image from "next/image";
import ThemeToggle from "@/components/ThemeToggle";
import JobSearch from "./JobSearch";
import styles from './Navbar.module.css';

export default function Navbar({ searchQuery, setSearchQuery }: {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}) {
  return (
    <nav className={`navbar-container ${styles.navbarContainer}`}>
      <div className={styles.logo}>
        <Image src='/images/briefcase 1.png' alt='Job Pilot' width={30} height={20} />
        <h3>Astra Jobs</h3>
      </div>

      <div className={styles.search}>
        <JobSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>

      <div className={styles.navIcons}>
        <ThemeToggle />
      </div>
    </nav>
  )
}
