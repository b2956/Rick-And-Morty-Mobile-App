import { gql } from '@apollo/client';

const filterOptions = (filter: string) => {
    switch(filter) {
        case 'name':
            return 'name';
        case 'episode':
            return 'episode';
        default:
            return 'name';
    }
} 

const ApolloEpisodeService = {
    getEpisodes: () => {
        return gql`
            query FetchEpisodes($page: Int) {
                    episodes(page: $page) {
                    info {
                        count
                        pages
                        next
                        prev
                    }
                    results {
                        id
                        name
                        air_date
                        episode
                        characters {
                            name
                        }
                    }
                }
            }
        `
    },
    getFilteredEpisodes: (filter: string) => {
        const filterType = filterOptions(filter);

        return gql`
            query FetchFilteredEpisodes($page: Int, $filter: String) {
                episodes(page: $page, filter: {
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
                        air_date
                        episode
                        characters {
                            name
                        }
                    }
                }
            }
        `
    }
}

export default ApolloEpisodeService;