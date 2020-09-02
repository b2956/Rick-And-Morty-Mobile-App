import React from 'react';
import {storiesOf} from '@storybook/react-native';

import EpisodeCard, {IEpisodeProps} from '../../../src/components/EpisodeCard';

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

storiesOf('EpisodeCard', module)
    .add('Default', () => <EpisodeCard {...EpisodeProps} />);