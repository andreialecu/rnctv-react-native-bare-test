import * as React from 'react';
import {Image, Dimensions, StyleSheet, Text} from 'react-native';
import * as Tabs from 'react-native-collapsible-tab-view';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated';

const width = Dimensions.get('window').width;

const ListEmptyComponent = () => {
  const {headerHeight, scrollY, scrollYCurrent} = Tabs.useTabsContext();

  const translateY = useDerivedValue(() => {
    return Animated.interpolate(
      scrollYCurrent.value,
      [0, headerHeight],
      [-headerHeight / 2, 0],
    );
  }, [scrollY]);

  const stylez = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: translateY.value,
        },
      ],
    };
  });

  return (
    <Animated.View style={[styles.listEmpty, stylez]}>
      <Text>Centered Empty List!</Text>
    </Animated.View>
  );
};

export const Albums: React.FC = ({data}) => {
  const [delayedData, setDelayedData] = React.useState([]);
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  }, []);

  // Trigger a re-render on this page?
  const [, updateState] = React.useState(1);
  React.useEffect(() => {
    const timer = setTimeout(() => {
      updateState(2);

      // Seems fine
      // setDelayedData(data);
    }, 100); // If this is higher, it seems slightly better?

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <Tabs.FlatList
      numColumns={2}
      // data={delayedData}
      data={data}
      ListEmptyComponent={ListEmptyComponent}
      renderItem={({item}) => (
        <Image source={{uri: item}} style={styles.cover} />
      )}
      keyExtractor={(_, i) => String(i)}
      refreshing={isRefreshing}
      onRefresh={onRefresh}
    />
  );
};

export default Albums;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#343C46',
  },
  cover: {
    borderWidth: 1,
    borderColor: 'black',
    width: width / 2 - 2,
    height: width / 2 - 2,
  },
  listEmpty: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 10,
  },
});
