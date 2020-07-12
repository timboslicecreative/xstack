import Head from 'next/head'
import Link from 'next/link'
import styles from "./Index.module.css"

export default function Index({posts}) {
    return (
        <div className="container">
            <Head>
                <title>My Next App</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main className={styles.index}>
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
    // const query = `query PublishedPosts($where: JSON, $sort: String) {
    //     posts(where: $where, sort: $sort) {
    //         title, slug,
    //     }
    // }`;
    // const variables = {
    //     where: {status: 'published'},
    //     sort: "date:desc"
    // };
    // const data = (await fetchAPI(query, {variables})) || [];
    // return {
    //     props: {posts: data.posts},
    // }

    // Return mocked posts instead of using api fetch above
    return {props: {posts: mockPosts}}
}

export const mockPosts = [
    {title: 'Example Post One', slug: 'example-post-one', content: 'Post one content'},
    {title: 'Example Post Two', slug: 'example-post-two', content: 'Post two content'}
];