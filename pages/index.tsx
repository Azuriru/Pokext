import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/index.module.css';

import { pages, Pokemon } from '../data/pages';

type HomeProps = {
    pokemons: Pokemon[];
};

function Home({ pokemons }: HomeProps) {
    const pokeLinks = pokemons.map(pokemon => {
        return (
            <Link key={pokemon} href={`/${pokemon}`}>
                {pokemon}
            </Link>
        );
    });

    return (
        <div id="root">
            <Head>
                <title>Pokext</title>
                <meta name="description" content="Pokemon" />
                <link rel="icon" href="/assets/favicon.ico" />
            </Head>

            <main class={styles.main}>
                <h1 class={styles.title}>
                    pokemon
                </h1>

                {pokeLinks}
            </main>
        </div>
    )
}

export async function getStaticProps() {
    return {
        props: {
            pokemons: pages.map(page => page.pokemon)
        }
    };
}

export default Home;