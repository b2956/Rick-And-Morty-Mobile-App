import { gql } from '@apollo/client';
import ApolloClientService from './ApolloEpisodeService';

const ApolloCharacterService = {
    getCharacters: () => {
        return gql`
            query FetchCharacters($page: Int) {
                    characters(page: $page) {
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
                            type
                            dimension
                        }
                        image
                        episode {
                            id
                            name
                            episode
                        }
                    }
                }
            }
        `
    }
}

export default ApolloCharacterService;