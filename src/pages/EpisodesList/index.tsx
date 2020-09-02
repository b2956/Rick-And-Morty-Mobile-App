import React, {useState} from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import { useQuery } from '@apollo/client';

import EpisodeCard, { IEpisodeProps} from '../../components/EpisodeCard';
import SearchBar from '../../components/SearchBar';
import Loader from '../../components/Loader';

import ApolloEpisodeService  from '../../services/ApolloEpisodeService';

type searchOptions = 'name' | 'episode';

export interface IFilterOptions {
    searchValue: string,
    searchOption: searchOptions,
    isSearching: boolean
}

const Wrapper = styled.View`
    width: 100%;
    height: 100%;
    background-color: #323541;
    justify-content: flex-start;
    align-items: center;
`;

const EpisodesList = () => {
    const [filterOptions, setFilterOptions] = useState({
        isSearching: true,
        searchOption: 'name',
        searchValue: ''
    } as IFilterOptions);

    const changeInputHandler = (inputValue: string) => {
        const isSearching = inputValue === '' ? false : true;

        setFilterOptions(prevState => {
            return {
                ...prevState,
                searchValue: inputValue,
                isSearching
            }
        })
    };

    const changeResultsFilter = (filterValue: searchOptions ) => {
        setFilterOptions(prevState => {
            return {
                ...prevState,
                searchOption: filterValue
            }
        });
    };

    const renderEpisodeCard = ({ item, index }: { item: IEpisodeProps, index: number }) => {
        return (
            <EpisodeCard
                characters={item.characters}
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

        if (loading) return <Loader/>;

        // if(data) console.log(data.episodes.result);

        if (data) return  (
            <React.Fragment>
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
                        if(!data.episodes.info.next) return;

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

    function useFetchFilteredEpisodes(filter: string) {
        const { loading, error, data, fetchMore } = useQuery(ApolloEpisodeService.getFilteredEpisodes(filter), {
            variables: {
                page: 1,
                filter: filterOptions.searchValue
            }
        });

        if (loading) return <Loader/>;

        // if(data) console.log(data.episodes.result);

        if (data) return  (
            <React.Fragment>
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
                        if(!data.episodes.info.next) return;

                        fetchMore({
                            variables: {
                                page: data.episodes.info.next
                            },
                            updateQuery: (prev: any, { fetchMoreResult }) => {
                                if (!fetchMoreResult) return prev;

                                const newData = {
                                    ...prev,
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
            <SearchBar 
                placeholder="Search Episode"
                options= {[
                    'name',
                    'episode'   
                ]}
                changeInputHandler={changeInputHandler}
                inputValue={filterOptions.searchValue}
                changeResultsFilter={changeResultsFilter}
            />
            { !filterOptions.isSearching &&
                useFetchEpisodes()
            }
            { filterOptions.isSearching &&
                useFetchFilteredEpisodes(filterOptions.searchOption)
            }
        </Wrapper>
    )
}

export default EpisodesList;