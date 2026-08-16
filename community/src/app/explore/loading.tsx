import styles from "./explore.module.css";

export default function ChargementExplore() {
  return (
    <main className={styles.main}>
      <h1 className={styles.titre}>Toutes les idées</h1>
      <ul className={styles.liste}>
        {[0, 1, 2].map((i) => (
          <li key={i} className={styles.poste}>
            <div className={styles.lien}>
              <div className="squelette" style={{ width: "30%", height: 12, marginBottom: 10 }} />
              <div className="squelette" style={{ width: "70%", height: 20, marginBottom: 8 }} />
              <div className="squelette" style={{ width: "45%", height: 14 }} />
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
