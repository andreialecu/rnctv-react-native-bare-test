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
import {SafeAreaView} from 'react-native';

import * as Tabs from 'react-native-collapsible-tab-view';

declare const global: {HermesInternal: null | {}};

const App = () => {
  console.log('test');
  return (
    <SafeAreaView>
      <Tabs.Container>
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

export default App;
