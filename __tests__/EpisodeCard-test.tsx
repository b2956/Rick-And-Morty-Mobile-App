import React from 'react';
import renderer from 'react-test-renderer';

import EpisodeCard, {IEpisodeProps} from '../src/components/EpisodeCard'; 

describe('Character Card', () => {
    const EpisodeProps: IEpisodeProps = {
        air_date: 'December 2, 2013',
        episode: 'S01E01',
        id: '1',
        name: 'Pilot',
        characters: [
            {
                __typename: 'Character',
                name: 'Rick'
            },
            {
                __typename: 'Character',
                name: 'Morty'
            },
        ]
    };

    it('Should render the Episode Card component correctly', () => {
        const tree = renderer.create(<EpisodeCard {...EpisodeProps} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});