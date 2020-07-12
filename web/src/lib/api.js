const fetch = require('node-fetch');
const GRAPHQL_API = process.env.GRAPHQL_API;

export async function fetchAPI(query, { variables } = {}) {
    const res = await fetch(GRAPHQL_API, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query,
            variables,
        }),
    });
    const json = await res.json();
    if (json.errors) {
        console.error(json.errors);
        throw new Error('Failed to fetch API')
    }
    return json.data
}
