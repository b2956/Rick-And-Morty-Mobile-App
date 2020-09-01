import { gql } from '@apollo/client';

const filterOptions = (filter: string) => {
    switch(filter) {
        case 'name':
            return 'name';
        case 'status':
            return 'status';
        case 'species':
            return 'species'
        case 'type':
            return 'type';
        case 'gender':
            return 'gender';
        default:
            return 'name';
    }
} 

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
    },
    getFilteredCharacters: (filter: string) => {
        const filterType = filterOptions(filter);

        return gql`
            query FetchFilteredCharacters($page: Int, $filter: String) {
                characters(page: $page, filter: {
                    ${filterType}: $filter
                })
                {
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