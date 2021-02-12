import * as React from 'react';
import {Image, Dimensions, StyleSheet, Text} from 'react-native';
import {Tabs} from 'react-native-collapsible-tab-view';

const width = Dimensions.get('window').width;

export const Albums: React.FC = ({data}) => {
  const [, updateState] = React.useState(1);
  React.useEffect(() => {
    const timer = setTimeout(() => {
      updateState(2);
    }, 100);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <Tabs.FlatList
      numColumns={2}
      data={data}
      renderItem={({item}) => (
        <Image source={{uri: item}} style={styles.cover} />
      )}
      keyExtractor={(_, i) => String(i)}
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
});
