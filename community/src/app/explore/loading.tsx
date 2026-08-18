import styles from "./explore.module.css";

export default function ChargementExplore() {
  return (
    <main className={styles.main}>
      {/* <p> et non <h1> : Next diffuse le squelette EN MÊME TEMPS que la page,
          donc un <h1> ici en produisait deux dans le même document (vérifié
          le 2026-08-18). Le vrai titre appartient à la page. */}
      <p className={styles.titre} aria-hidden="true">Toutes les idées</p>
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
