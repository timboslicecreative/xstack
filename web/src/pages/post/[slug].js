import Link from "next/link";
import {MdChevronLeft} from "react-icons/md";
import {fetchStatic} from "../../lib/api";
import styles from "./Post.module.css";
import {thurl} from "../../lib/thumbor";

export default function Post({post}) {
    return (
        <article className={styles.post}>
            <Link href={`/`}><a className={'backLink'}><MdChevronLeft size={24}/>Home</a></Link>
            <header>
                <h1>{post.title}</h1>
            </header>
            <img src={post.hero.thumbnail.publicUrl} />
            <img src={thurl.build(post.hero.url, {width: 540})} />
            <section>
                <p>{post.content}</p>
            </section>
        </article>
    )
};

export async function getStaticPaths() {
    const query = `{
        posts {
            slug,
        }
    }`;
    const variables = {};
    const data = (await fetchStatic(query, {variables})) || [];
    const paths = data.posts.map(post => ({params: {slug: post.slug}}));
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({params}) {
    const query = `query postBySlug($slug: String!){
        postBySlug(slug: $slug) {
            slug, title, content,
            hero {
                url, width, height, formats
            }
        }}`;
    const variables = {
        slug: params.slug
    };
    const data = (await fetchStatic(query, {variables})) || [];
    return {
        props: {post: data.postBySlug},
    }
}