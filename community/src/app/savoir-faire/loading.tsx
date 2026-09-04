import styles from "./savoir-faire.module.css";

export default function ChargementSavoirFaire() {
  return (
    <main className={styles.main}>
      <div className={styles.entete}>
        <p aria-hidden="true" style={{ font: "800 clamp(2rem, 1.6rem + 1.8vw, 2.6rem)/1.12 inherit", letterSpacing: "-.025em" }}>
          Ce qu&apos;on sait faire
        </p>
        <div className="squelette" style={{ width: "60%", height: 18, marginTop: 12 }} />
      </div>
      <div aria-hidden="true" style={{ marginTop: "2.4rem" }}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} style={{ marginBottom: "2rem" }}>
            <div className="squelette" style={{ width: "44%", height: 20, marginBottom: 10 }} />
            <div className="squelette" style={{ width: "92%", height: 14, marginBottom: 6 }} />
            <div className="squelette" style={{ width: "70%", height: 14 }} />
          </div>
        ))}
      </div>
    </main>
  );
}
