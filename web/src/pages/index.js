import Head from 'next/head'
import Link from 'next/link'
import {fetchStatic} from "../lib/api";
import footer from '../components/Footer';
import styles from './Index.module.css'

export default function Index({posts}) {
    return (
        <div className="container">
            <Head>
                <title>My Next App</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main className={styles.index}>
                {posts.length <= 0 ? "Publish a post via the api to see it here" : null }
                <ol>
                    {posts.map(post => <li key={post.slug}>
                        <Link href={`/post/[slug]`} as={`/post/${post.slug}`}>
                            <a>{post.title}</a>
                        </Link>
                    </li>)}
                </ol>
            </main>
            <footer>
            </footer>
        </div>
    )
};

export async function getStaticProps({}) {
    const query = `query PublishedPosts($where: JSON, $sort: String) {
        posts(where: $where, sort: $sort) {
            title, slug,
        }
    }`;
    const variables = {
        where: {status: 'published'},
        sort: "date:asc"
    };
    const data = (await fetchStatic(query, {variables})) || [];
    return {
        props: {posts: data.posts},
    }
}
