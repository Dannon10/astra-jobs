'use client';

import { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import styles from './Navbar.module.css'; 

export default function ThemeToggle() {
    const [isLight, setIsLight] = useState(true);

    useEffect(() => {
        const storedTheme = localStorage.getItem("theme");
        if (storedTheme === "dark") {
            setIsLight(false);
            document.body.classList.add("dark");
        }
    }, []);

    useEffect(() => {
        const body = document.body;

        if (isLight) {
            body.classList.remove("dark");
            localStorage.setItem("theme", "light");
        } else {
            body.classList.add("dark");
            localStorage.setItem("theme", "dark");
        }
    }, [isLight]);

    return (
        <div>
            <label className={styles.themeToggle}>
                <button
                    onClick={() => setIsLight((prev) => !prev)}
                    className={styles.toggleButton}
                >
                    {isLight ? (
                        <FiMoon size={30} title="Dark Mode" />
                    ) : (
                        <FiSun size={30} title="Light Mode" />
                    )}
                </button>
            </label>
        </div>
    );
}
