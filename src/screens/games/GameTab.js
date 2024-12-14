import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {images, icons, colors, fontSizes} from '../../constants';
import {UIHeader, Icon} from '../../components';

const GameTabItem = ({name, imageURL, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.itemContainer}>
      <Icon name={{uri: imageURL}} size={125} style={styles.avatarImage} />
      <Text style={styles.name}>{name}</Text>
    </TouchableOpacity>
  );
};

export default GameTab = props => {
  const {navigate, goBack} = props.navigation;
  const [games] = useState([
    {
      id: 1,
      name: 'Đoán Chữ',
      imageURL:
        'https://i.pinimg.com/originals/13/80/d5/1380d50092148938faf8d36739979c05.png',
      gameScreen: 'GamePicWord',
    },
    {
      id: 2,
      name: 'Xếp Chữ Trùng Lặp',
      imageURL:
        'https://vcdn1-vnexpress.vnecdn.net/2022/09/25/-4526-1664080160.jpg?w=460&h=0&q=100&dpr=2&fit=crop&s=kOuOtxAMJS27kgrR81l-wg',
      gameScreen: 'GameWordSort',
    },
  ]);

  return (
    <View style={styles.container}>
      <UIHeader title={'Mini Games'} />
      <FlatList
        data={games}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <GameTabItem
            name={item.name}
            imageURL={item.imageURL}
            onPress={() => navigate(`${item.gameScreen}`)}
          />
        )}
        numColumns={2}
        contentContainerStyle={styles.flatlistContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatlistContent: {
    padding: 10,
  },
  //
  itemContainer: {
    width: '50%',
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarImage: {
    borderRadius: 10,
    borderColor: colors.inactive,
    borderWidth: 3,
  },
  name: {
    color: 'black',
    fontSize: fontSizes.h5,
    marginTop: 5,
    textAlign: 'center',
  },
});
