import styles from "../styles/page.module.css";
import PokemonsList from "@/components/pokemons/PokemonsList";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <PokemonsList />
      </main>
      <footer className={styles.footer}>
      </footer>
    </div>
  );
}
