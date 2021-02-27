/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, View, Pressable, Text} from 'react-native';
import * as Tabs from 'react-native-collapsible-tab-view';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {enableScreens} from 'react-native-screens';

import Albums from './Albums';
import Page from './Page';
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

const Header = () => {
  const {user} = React.useContext(TabScreenContext);
  return (
    <View
      style={[
        styles.header,
        {
          height: user?.role === 'artist' ? 200 : 100,
          backgroundColor: user?.role === 'artist' ? 'pink' : 'green',
        },
      ]}
    />
  );
};

const TabScreen = () => {
  const [covers, _] = React.useState(COVERS);
  const pageRef = React.useRef<Tabs.CollapsibleRef>(null);

  const _renderTabBar = (props: any) => (
    <Tabs.MaterialTabBar
      {...props}
      indicatorStyle={{
        backgroundColor: 'black',
        height: 2,
      }}
    />
  );

  const [user, setUser] = React.useState<any>({});

  // EXAMPLE 1: First tab is shown as blank if array is empty

  const [tabs, setTabs] = React.useState<any>([]);
  useEffect(() => {
    setTimeout(() => {
      setTabs([
        {
          component: <Page />,
          name: 'A',
        },
        {
          component: <Albums />,
          name: 'B',
        },
      ]);
    }, 200);
  }, []);

  // EXAMPLE 2: WIP - simulating a role change of a user, still not seeing the same error

  // const [tabs, setTabs] = React.useState([
  //   ...(user?.role === 'artist'
  //     ? [
  //         {
  //           component: <Page />,
  //           name: 'C',
  //         },
  //       ]
  //     : []),
  //   {
  //     component: <Albums />,
  //     name: 'A',
  //   },
  // ]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setUser({role: 'artist'});
  //   }, 500);
  // }, []);

  // useEffect(() => {
  //   setTabs([
  //     {
  //       component: <Albums />,
  //       name: 'A',
  //     },
  //     ...(user?.role === 'artist'
  //       ? [
  //           {
  //             component: <Page />,
  //             name: 'C',
  //           },
  //         ]
  //       : []),
  //   ]);
  // }, [user?.role]);

  const _renderHeader = () => <Header />;

  const MemoizedTabs = React.useMemo(
    () => (
      <Tabs.Container
        // HeaderComponent={Header}
        HeaderComponent={_renderHeader}
        TabBarComponent={_renderTabBar}
        ref={pageRef}
        lazy
        snapThreshold={0.5}>
        {tabs.map((tab) => (
          <Tabs.Tab key={tab.name} name={tab.name}>
            {tab.component}
          </Tabs.Tab>
        ))}
      </Tabs.Container>
    ),
    [tabs],
  );

  return (
    <SafeAreaView style={styles.container}>
      <TabScreenContext.Provider
        value={{
          covers,
          user,
        }}>
        {MemoizedTabs}
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
    // height: 200,
    backgroundColor: 'blue',
    flex: 1,
  },
});

export default App;
