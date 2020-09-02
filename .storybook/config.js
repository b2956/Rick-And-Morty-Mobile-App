import { configure, addParameters, addDecorator } from '@storybook/react-native';
import { withInfo } from '@storybook/addon-info';

// addParameters({
//   options: {
//     theme,
//   },
// });

// addDecorator(withInfo);
// addDecorator(centered);

// Import all stories
configure(require.context('../storybook/stories', true, /\.stories\.tsx$/), module);