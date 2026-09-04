import styles from "./realisations.module.css";

/* Le squelette reprend la grille de cartes réelle, pas un bloc gris générique :
   la page ne doit pas sauter quand le contenu arrive. <p> et non <h1>, sinon
   le document en contient deux pendant le streaming. */
export default function ChargementRealisations() {
  return (
    <main className={styles.main}>
      <div className={styles.entete}>
        <p aria-hidden="true" style={{ font: "700 var(--t-h1)/1.1 var(--disp)" }}>
          Nos plateformes
        </p>
        <div className="squelette" style={{ width: "58%", height: 18, marginTop: 12 }} />
      </div>
      <div className={styles.grille} aria-hidden="true">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i} className={styles.carte}>
            <div className={styles.carteHaut}>
              <div className="squelette" style={{ width: 40, height: 40, borderRadius: 10 }} />
              <div style={{ flex: 1 }}>
                <div className="squelette" style={{ width: "40%", height: 11, marginBottom: 8 }} />
                <div className="squelette" style={{ width: "72%", height: 18 }} />
              </div>
            </div>
            <div className="squelette" style={{ width: "94%", height: 14, margin: "14px 0 6px" }} />
            <div className="squelette" style={{ width: "62%", height: 14 }} />
          </div>
        ))}
      </div>
    </main>
  );
}
