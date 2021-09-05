import Link from 'next/link';
import { capitalize } from '../util';
import styles from '../styles/sidebar.module.css';

import { pages, Pokemon } from '../data/pages';

// type SidebarProps = {
//     pokemon: Pokemon;
// };

function Sidebar(/*{ pokemon }: SidebarProps*/) {
    const pokeLinks = pages.map(({ pokemon }) => {
        return (
            <div className="sidebar-item">
                <Link key={pokemon} href={`/${pokemon}`}>
                    {capitalize(pokemon)}
                </Link>
            </div>
        );
    });

    return (
        <div class={styles.sidebar}>
            {pokeLinks}
        </div>
    );
}

export default Sidebar;