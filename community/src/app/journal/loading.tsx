import styles from "./journal.module.css";

export default function ChargementJournal() {
  return (
    <main className={styles.main}>
      <div className={styles.entete}>
        <p aria-hidden="true" style={{ font: "700 var(--t-h1)/1.1 var(--disp)" }}>
          Journal
        </p>
        <div className="squelette" style={{ width: "66%", height: 18, marginTop: 12 }} />
      </div>
      <div aria-hidden="true">
        {[0, 1].map((m) => (
          <section key={m} className={styles.mois}>
            <div className="squelette" style={{ width: 140, height: 14, marginBottom: 16 }} />
            {[0, 1, 2].map((i) => (
              <div key={i} className={styles.entree}>
                <div className="squelette" style={{ width: "30%", height: 12, marginBottom: 10 }} />
                <div className="squelette" style={{ width: "82%", height: 18, marginBottom: 8 }} />
                <div className="squelette" style={{ width: "90%", height: 14 }} />
              </div>
            ))}
          </section>
        ))}
      </div>
    </main>
  );
}
