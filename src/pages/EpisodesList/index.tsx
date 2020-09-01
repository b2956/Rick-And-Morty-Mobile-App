import React from 'react';
import { FlatList , ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import { useQuery } from '@apollo/client';

import EpisodeCard, { IEpisodeProps} from '../../components/EpisodeCard';
import SearchBar from '../../components/SearchBar';

import ApolloEpisodeService  from '../../services/ApolloEpisodeService';

const Wrapper = styled.View`
    width: 100%;
    height: 100%;
    background-color: #323541;
    justify-content: center;
    align-items: center;
`;


const EpisodesList = () => {

    const renderEpisodeCard = ({ item, index }: { item: IEpisodeProps, index: number }) => {
        return (
            <EpisodeCard 
                episode={item.episode}
                air_date={item.air_date}
                id={item.id}
                name={item.name}
                key={index}
            />
        )
    }

    function useFetchEpisodes() {
        const { loading, error, data, fetchMore } = useQuery(ApolloEpisodeService.getEpisodes(), {
            variables: {
                page: 1
            }
        });

        if (loading) return <ActivityIndicator color="baby-blue" size='large' />;

        // if(data) console.log(data.episodes.result);

        if (data) return  (
            <React.Fragment>
                <SearchBar 
                    placeholder="Search Episode"
                    options= {[
                        'name',
                        'episode'   
                    ]}
                />
                <FlatList
                    style={{ width: '100%' }}
                    contentContainerStyle={{
                        justifyContent: 'flex-start',
                        paddingVertical: 10,
                        backgroundColor: '#323541'
                    }}
                    data={data.episodes.results}
                    renderItem={renderEpisodeCard}
                    onEndReached={() => {
                        console.log(data.episodes.info.next);
                        fetchMore({
                            variables: {
                                page: data.episodes.info.next
                            },
                            updateQuery: (prev: any, { fetchMoreResult }) => {
                                if (!fetchMoreResult) return prev;

                                const newData = {
                                    episodes: {
                                        info: fetchMoreResult.episodes.info,
                                        results: [
                                            ...prev.episodes.results, ...fetchMoreResult.episodes.results
                                        ]
                                    }
                                }
                                return newData;
                            }
                        });
                    }
                }
                />
            </React.Fragment>
        )
    }

    return (
        <Wrapper>
            {useFetchEpisodes()}
        </Wrapper>
    )
}

export default EpisodesList;