import { gql } from '@apollo/client';

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
                    }
                }
            }
        `
    },

    // query FetchEpisodes($page: Int) {
    //     episodes(page: $page, filter: {
    //     name: 
    //     episode: "S01E01"
    //   }) {
    //     info {
    //       count
    //       pages
    //       next
    //       prev
    //     }
    //     results {
    //       id
    //       name
    //       air_date
    //       episode
    //     }
    //   }
    // }
}

export default ApolloEpisodeService;