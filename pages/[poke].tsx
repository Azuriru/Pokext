import { Fragment } from 'react';
import Head from 'next/head';
import Sidebar from '../components/sidebar';
import { capitalize as c } from '../util';

import styles from '../styles/poke.module.css';

import { pages, Page, Pokemon, ContentItem } from '../data/pages';

type PokeProps = {
    pokemon: Pokemon;
    page: Page;
};

function PokeImage(pokemon: Pokemon, type: String) {
    return (
        <div class="tabber">
            <div class="title">{c(type)}</div>
            <img
                src={`/assets/imgs/pokemon/${pokemon}${type ? `-${type}` : ''}.png`}
                width={250}
            />
        </div>
    );
}

function Poke({ pokemon, page }: PokeProps) {
    const images = [ PokeImage(pokemon, '') ];

    if (page.images) {
        for (const file of page.images) {
            images.push(PokeImage(pokemon, file));
        }
    }

    return (
        <div id="root">
            <Head>
                <title>{c(pokemon)} - Info</title>
                <meta name="description" content={`Stuff about ${c(pokemon)}`} />
                <link rel="icon" href={`/assets/favicon/${pokemon}.png`} />
            </Head>

            <div className={styles.main}>
                <Sidebar />
                <main className="main-content">
                    <h1>
                        {page.title}
                    </h1>

                    {images}

                    {page.content.map(mapItem)}
                </main>
            </div>
        </div>
    );
}

function mapItem(item: ContentItem, index: number) {
    let elem;
    switch (item.type) {
        case 'paragraph':
            elem = (
                <p>{item.text}</p>
            );
            break;
    }

    return (
        <Fragment key={index}>
            {elem}
        </Fragment>
    );
}

export async function getStaticPaths() {
    const paths = pages.map(page => {
        return {
            params: {
                poke: page.pokemon
            }
        };
    });

    return {
        paths,
        fallback: false
    };
}

type StaticProps = {
    params: {
        poke: Pokemon
    };
};

export async function getStaticProps({ params }: StaticProps) {
    return {
        props: {
            pokemon: params.poke,
            page: pages.find(page => page.pokemon === params.poke)
        }
    };
}

export default Poke;
