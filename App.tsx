/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

import * as Tabs from 'react-native-collapsible-tab-view';

declare const global: {HermesInternal: null | {}};

const CustomTabBar = ({
  activeColor = '#1d1d1c',
  inactiveColor = '#E3E3E3',
  tabBarItemProps = {},
  ...props
}) => (
  <Tabs.MaterialTabBar
    activeColor={activeColor}
    inactiveColor={inactiveColor}
    indicatorStyle={styles.indicatorStyle}
    {...props}
  />
);

const App = () => {
  return (
    <SafeAreaView>
      <Tabs.Container
        TabBarComponent={(props: any) => (
          <CustomTabBar
            {...props}
            // Adding `scrollEnabled` removes indicator
            scrollEnabled
          />
        )}>
        <Tabs.Tab name="A">
          <Tabs.FlatList
            data={[0, 1, 2, 3, 4]}
            keyExtractor={(v) => v + ''}
            renderItem={null}
          />
        </Tabs.Tab>
        <Tabs.Tab name="B">
          <Tabs.ScrollView>{null}</Tabs.ScrollView>
        </Tabs.Tab>
      </Tabs.Container>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  indicatorStyle: {
    backgroundColor: '#000',
    height: 2,
  },
});

export default App;
