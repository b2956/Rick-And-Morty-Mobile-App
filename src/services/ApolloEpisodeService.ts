import client from './ApolloCharacterService';

import { gql } from '@apollo/client';

// type Info = {
//     count: number
//     pages: number
//     next: number
//     prev: number
// }

// type Character {
//     id: string,
//     name: string
//     status: string
//     species: string
//     type: string
//     gender: string
//     origin: Location
//     location: Location
//     image: string
//     episode: [Episode]
// }

// interface IApiService {
//     getCharacters(page: number): 
// }

const ApolloClientService = {
    getCharacters: (page: number) => {
        client.query({
            query: gql`
                query {
                    characters(page: ${page}) {
                        info {
                        count
                        pages
                        next
                        prev
                        }
                        results {
                        id
                        name
                        status
                        species
                        type
                        gender
                        origin {
                            name
                            type
                            dimension
                        }
                        location {
                            name
                        }
                        image
                        episode {
                            name
                            episode
                        }
                        }
                    }
                }
            `
        })
        .then(result => console.log(result))
    }
}

export default ApolloClientService;