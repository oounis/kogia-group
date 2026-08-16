import styles from "./article.module.css";

export default function ChargementArticle() {
  return (
    <main className={styles.main}>
      <div className="squelette" style={{ width: 140, height: 14, marginBottom: 24 }} />
      <div className="squelette" style={{ width: "40%", height: 12, marginBottom: 14 }} />
      <div className="squelette" style={{ width: "90%", height: 32, marginBottom: 10 }} />
      <div className="squelette" style={{ width: "60%", height: 32, marginBottom: 20 }} />
      <div className="squelette" style={{ width: "100%", height: 18, marginBottom: 10 }} />
      <div className="squelette" style={{ width: "95%", height: 18, marginBottom: 10 }} />
      <div className="squelette" style={{ width: "80%", height: 18 }} />
    </main>
  );
}
