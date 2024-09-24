import Image from 'next/image';
import styles from '../../styles/PokemonsList.module.css'

const urlBase = `https://pokeapi.co/api/v2/pokemon`;

export default async function PokemonsList() {
    let data = await fetch(`${urlBase}?limit=1500&offset=0`);
    let pokemons = await data.json();

    return (
        <>
            <h1 className={styles.title}>Lista Pokémons</h1>
            <div className={styles.list}>
                {pokemons.results.map(async (poke) => {
                    let res = await fetch(`${urlBase}/${poke.name}`);
                    let pokemon = await res.json();
                    return (
                        <div key={pokemon.id} className={styles.card}>
                            <Image
                                alt={pokemon.name ?? ""}
                                src={pokemon.sprites.other.dream_world.front_default !== null ? 
                                    pokemon.sprites.other.dream_world.front_default : pokemon.sprites.other.home.front_default !== null ? 
                                    pokemon.sprites.other.home.front_default : "https://via.placeholder.com/100" }
                                width={100}
                                height={100} />
                            <h2>{pokemon.name}</h2>
                            <p className={ styles.type }> {pokemon.types[0].type.name} </p>                          
                            <ul className={ styles.stats }>
                                {pokemon.stats.map((stat, index) => {
                                    return (
                                        stat.stat.name !== "hp" && stat.stat.name !== "special-attack" && stat.stat.name !== "special-defense" &&
                                        <li key={index}>
                                            <span>{stat.stat.name}</span> 
                                            <span>{stat.base_stat}</span> 
                                            <input 
                                                className={`${pokemon.types[0].type.name === "fire" ? 
                                                    styles.fire : pokemon.types[0].type.name === "grass" ? 
                                                    styles.grass : pokemon.types[0].type.name === "water" ? 
                                                    styles.water : pokemon.types[0].type.name === "bug" ? 
                                                    styles.bug : pokemon.types[0].type.name === "fairy" ?
                                                    styles.fairy : pokemon.types[0].type.name === "poison" ?
                                                    styles.poison : pokemon.types[0].type.name === "electric" ?
                                                    styles.electric : pokemon.types[0].type.name === "ground" ?
                                                    styles.ground : pokemon.types[0].type.name === "rock" ?
                                                    styles.rock : pokemon.types[0].type.name === "ghost" ?
                                                    styles.ghost : pokemon.types[0].type.name === "psychic" ?
                                                    styles.psychic : pokemon.types[0].type.name === "dragon" ?
                                                    styles.dragon : pokemon.types[0].type.name === "ice" ?
                                                    styles.ice : pokemon.types[0].type.name === "steel" ?
                                                    styles.steel : pokemon.types[0].type.name === "fighting" ?
                                                    styles.fighting : styles.normal }`} 
                                                type="range" 
                                                min="0" 
                                                max="300" 
                                                step="1" 
                                                value={stat.base_stat} disabled/>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    )
                })}
            </div>
        </>
    );
}