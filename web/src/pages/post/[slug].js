import Link from "next/link";
import {MdChevronLeft} from "react-icons/md";
import {fetchAPI} from "../../lib/api";
import styles from "./Post.module.css";

import {mockPosts} from "../index";

export default function Post({post}) {
    return (
        <article className={styles.post}>
            <Link href={`/`}><a><MdChevronLeft size={24}/>Home</a></Link>
            <header>
                <h1>{post.title}</h1>
            </header>
            <section>
                <p>{post.content}</p>
            </section>
        </article>
    )
};


export async function getStaticPaths() {
    // const query = `{
    //     posts {
    //         slug,
    //     }
    // }`;
    // const variables = {};
    // const data = (await fetchAPI(query, {variables})) || [];
    // const paths = data.posts.map(post => ({params: {slug: post.slug}}));
    // return {
    //     paths,
    //     fallback: false
    // }

    // Return mocked posts instead of using api fetch above
    return {
        paths: mockPosts.map(post => ({params: {slug: post.slug}})),
        fallback: false
    }
}

export async function getStaticProps({params}) {
    // const query = `query postBySlug($slug: String!){
    //     postBySlug(slug: $slug) {
    //         slug, title, content,
    //     }}`;
    // const variables = {
    //     slug: params.slug
    // };
    // const data = (await fetchAPI(query, {variables})) || [];
    // return {
    //     props: {post: data.postBySlug},
    // }

    // Return mocked posts instead of using api fetch above
    return {
        props: {post: mockPosts.find(post => post.slug === params.slug)}
    }
}