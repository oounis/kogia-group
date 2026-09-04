import styles from "./news.module.css";

/* <p> et non <h1> : Next diffuse le squelette EN MÊME TEMPS que la page, donc
   un <h1> ici en produirait deux dans le même document. Le vrai titre
   appartient à la page. Même raison que dans explore/loading.tsx. */
export default function ChargementNews() {
  return (
    <main className={styles.main}>
      <div className={styles.entete}>
        <p aria-hidden="true" style={{ font: "700 var(--t-h1)/1.1 var(--disp)" }}>
          Actualités
        </p>
        <div className="squelette" style={{ width: "62%", height: 18, marginTop: 12 }} />
      </div>
      <ol className={styles.liste} aria-hidden="true">
        {[0, 1, 2, 3].map((i) => (
          <li key={i} className={styles.entree}>
            <div className="squelette" style={{ width: "34%", height: 12, marginBottom: 12 }} />
            <div className="squelette" style={{ width: "78%", height: 22, marginBottom: 10 }} />
            <div className="squelette" style={{ width: "92%", height: 14, marginBottom: 6 }} />
            <div className="squelette" style={{ width: "56%", height: 14 }} />
          </li>
        ))}
      </ol>
    </main>
  );
}
