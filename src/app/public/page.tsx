import React from 'react';
import styles from '../../styles/pages/HomePage.module.css';
import Image from 'next/image';



export default function HomePage() {
  return (
    <div className={styles.container}>

      {/* Premier slide  */}
      <div className={styles.slide1}>
        <section className={styles.hero1}>
          <h1>Learn with expert anytime anywhere</h1>
          <p>Our mision is to help people to find the best course online and learn with expert anytime, anywhere.</p>
          <button>Create Account</button>
          </section>

          <section  className={styles.hero2}>
            <Image 
              src={require("../../assets/accueilTemplate.png")}
              alt=' '
              width={100}
              height={110}
              priority={true}
            />

          </section>

        </div>
    </div>
  );
}
