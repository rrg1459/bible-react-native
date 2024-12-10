import { useWindowDimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';

import Settings from './settings';
import ComponentVerses from '../components/Verses';

const renderScene = SceneMap({
  screen: ComponentVerses,
  settings: Settings,
});

export default function ChaptersScreen() {
  const layout = useWindowDimensions();
  const navigationState = {
    index: 0, routes: [{ key: 'screen' }, { key: 'settings' }],
  };

  return (
    <TabView
      renderTabBar={() => null}
      navigationState={navigationState}
      renderScene={renderScene}
      onIndexChange={() => navigationState}
      initialLayout={{ width: layout.width }}
    />
  );
};