import React from 'react';
import {storiesOf} from '@storybook/react-native';

import SearchBar from '../../../src/components/SearchBar';



storiesOf('EpisodeCard', module)
    .add('Default', () => <SearchBar changeInputHandler={()=>{}} changeResultsFilter={()=>{}} placeholder='Search Character' inputValue='' options={['name', 'status']}/>);