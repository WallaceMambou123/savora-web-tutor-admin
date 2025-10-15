import React from 'react';
import styles from "../../styles/components/Header.module.css"; 
import { Search, Bell, ShoppingCart } from 'lucide-react'; 


export function Header() {
    
    return (
        <header className={styles.header}>
            <div className={styles.leftSection}>
                {/* 1. Logo */}
                <div className={styles.logo}>
                  <img src={require("../../assets/logo/2.png")}  />
                </div>

                {/* 2. Bouton Catégories / Parcourir */}
                <div className={styles.browseButton}>
                    Browse <span className={styles.arrowDown}>▼</span>
                </div>
            </div>

            {/* 3. Barre de Recherche */}
            <div className={styles.searchContainer}>
                <span className={styles.searchIcon}><Search /></span>
                <input
                    type="text"
                    placeholder="What do you want learn..."
                    className={styles.searchInput}
                />
            </div>

            <div className={styles.rightSection}>
                {/* 4. Icônes de Navigation */}
                <div className={styles.icons}>
                    <button className={styles.iconButton}><Bell /></button> {/* Notification */}
                    <button className={styles.iconButton}><ShoppingCart/></button> {/* Panier */}
                </div>

                {/* 5. Boutons d'Action */}
                <button className={styles.createAccountButton}>
                    Create Account
                </button>
                <button className={styles.signInButton}>
                    Sign In
                </button>
            </div>
        </header>
    );
}

// Pour le moment, nous allons l'exporter sans props pour correspondre à votre demande initiale :
export function HeaderDemo() {
    return (
        <header className={styles.header}>
            <div className={styles.leftSection}>
                <div className={styles.logo}>Savoora</div>
                <div className={styles.browseButton}>
                    Browse <span className={styles.arrowDown}>▼</span>
                </div>
            </div>
            <div className={styles.searchContainer}>
                <span className={styles.searchIcon}>🔍</span>
                <input
                    type="text"
                    placeholder="What do you want to learn..."
                    className={styles.searchInput}
                />
            </div>
            <div className={styles.rightSection}>
                <div className={styles.icons}>
                    <button className={styles.iconButton}>🔔</button>
                    <button className={styles.iconButton}>🛒</button>
                </div>
                <button className={styles.createAccountButton}>
                    Create Account
                </button>
                <button className={styles.signInButton}>
                    Sign In
                </button>
            </div>
        </header>
    );
}