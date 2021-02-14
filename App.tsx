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
import {SafeAreaView, StyleSheet, View, Pressable, Text} from 'react-native';
import * as Tabs from 'react-native-collapsible-tab-view';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {enableScreens} from 'react-native-screens';

import Albums from './Albums';
import {TabScreenContext} from './context';

declare const global: {HermesInternal: null | {}};

enableScreens();

const GetNewCovers = () =>
  [
    'https://source.unsplash.com/random/1600x900',
    'https://source.unsplash.com/random/1600x901',
    'https://source.unsplash.com/random/1600x902',
    'https://source.unsplash.com/random/1600x903',
    'https://source.unsplash.com/random/1600x904',
    'https://source.unsplash.com/random/1600x905',
    'https://source.unsplash.com/random/1600x906',
    'https://source.unsplash.com/random/1600x907',
    'https://source.unsplash.com/random/1600x908',
    'https://source.unsplash.com/random/1600x909',
    'https://source.unsplash.com/random/1600x910',
  ].sort(() => 0.5 - Math.random());

const COVERS = GetNewCovers();

const Header = () => <View style={styles.header} />;

const TabScreen = () => {
  const [covers, setCovers] = React.useState(COVERS);

  const _renderTabBar = (props: any) => (
    <Tabs.MaterialTabBar
      {...props}
      indicatorStyle={{
        backgroundColor: 'black',
        height: 2,
      }}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <TabScreenContext.Provider
        value={{
          covers,
        }}>
        <Tabs.Container
          HeaderComponent={Header}
          onTabChange={() => {
            setTimeout(() => {
              setCovers(GetNewCovers());
            }, 200);
          }}
          TabBarComponent={_renderTabBar}>
          <Tabs.Tab name="A">
            <Albums />
          </Tabs.Tab>
          <Tabs.Tab name="B">
            <Albums />
          </Tabs.Tab>
        </Tabs.Container>
      </TabScreenContext.Provider>
    </SafeAreaView>
  );
};

const HomeScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Pressable onPress={() => navigation.navigate('TabScreen')}>
        <Text>Home Screen</Text>
      </Pressable>
    </View>
  );
};

const Stack = createStackNavigator();

const App = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{title: 'Home'}}
      />
      <Stack.Screen
        name="TabScreen"
        component={TabScreen}
        options={{title: 'Tabs'}}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 200,
    backgroundColor: 'blue',
    flex: 1,
  },
});

export default App;
