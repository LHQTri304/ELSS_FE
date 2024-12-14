import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {images, icons, colors, fontSizes} from '../../../constants';
import {UIHeader, Icon} from '../../../components';

import {dataNounVocabulary} from '../../../testFE';

export default GamePicWord = props => {
  const {navigate, goBack} = props.navigation;
  const {width, height} = Dimensions.get('window');

  //Lấy targetWord
  const randomIndex = Math.floor(Math.random() * dataNounVocabulary.length);
  const [targetWord, setTargetWord] = useState(
    dataNounVocabulary[randomIndex].toUpperCase(),
  ); // Từ cần xếp
  const shuffledWord = targetWord.split('').sort(() => Math.random() - 0.5); // Xáo trộn thứ tự

  const [selectedLetters, setSelectedLetters] = useState(
    Array(targetWord.length).fill(null),
  ); // Dòng trên
  const [availableLetters, setAvailableLetters] = useState(shuffledWord); // Dòng dưới

  const handleSelectLetter = (letter, index) => {
    const emptyIndex = selectedLetters.findIndex(l => l === null);
    if (emptyIndex === -1) return; // Không còn ô trống

    const updatedSelected = [...selectedLetters];
    updatedSelected[emptyIndex] = letter;

    const updatedAvailable = [...availableLetters];
    updatedAvailable[index] = null;

    setSelectedLetters(updatedSelected);
    setAvailableLetters(updatedAvailable);
  };

  const handleRemoveLetter = index => {
    const updatedSelected = [...selectedLetters];
    const letter = updatedSelected[index];
    if (!letter) return;

    const updatedAvailable = [...availableLetters];
    const emptyIndex = updatedAvailable.findIndex(l => l === null);
    updatedAvailable[emptyIndex] = letter;

    updatedSelected[index] = null;

    setSelectedLetters(updatedSelected);
    setAvailableLetters(updatedAvailable);
  };

  const checkWin = () => {
    if (selectedLetters.join('') === targetWord) {
      alert(`Bạn đã thắng!\nBạn đã xếp đúng từ ${targetWord}!`);

      // Tạo một màn chơi mới sau khi thắng
      setTimeout(() => {
        const randomIndex = Math.floor(
          Math.random() * dataNounVocabulary.length,
        );
        const newTargetWord = dataNounVocabulary[randomIndex].toUpperCase();
        const newShuffledWord = newTargetWord
          .split('')
          .sort(() => Math.random() - 0.5);

        setTargetWord(newTargetWord);
        setSelectedLetters(Array(newTargetWord.length).fill(null));
        setAvailableLetters(newShuffledWord);
        fetchImages(newTargetWord);
      }, 1000); // Đợi 1 giây trước khi thay đổi từ
    }
  };

  useEffect(() => {
    checkWin();
  }, [selectedLetters]);

  //Lấy hình ảnh theo targetWord
  const [images, setImages] = useState([]);
  const [imgIndex, setImgIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const textReloadImg = `Reload`;
  const textNextImg = `Nếu hình không rõ\nNhấn đây`;
  const fetchImages = async (query = targetWord) => {
    if (loading) return; // Tránh gửi nhiều yêu cầu đồng thời
    setLoading(true);
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${query}&client_id=37OSAJ64LuiTnV_tB51bcwQ8pmUerd_BgYXOwIVAxW8`,
    );
    const data = await response.json();
    setImages(data.results);
    setLoading(false);
  };

  handleNextImg = () => {
    imgIndex < 9 ? setImgIndex(imgIndex + 1) : setImgIndex(0);
  };

  handleReloadImg = () => {
    if (!images[imgIndex]) fetchImages();
    //console.log(images[imgIndex]);
  };

  useEffect(() => {
    handleReloadImg();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://png.pngtree.com/element_our/sm/20180408/sm_5ac9b8967574d.jpg',
        }}
        style={[
          {
            width: width,
            height: height,
          },
          styles.background,
        ]}
      />
      <View style={styles.mainView}>
        <Icon
          name={{
            uri: images[imgIndex]
              ? images[imgIndex].urls.small.toString()
              : 'https://png.pngtree.com/element_our/sm/20180408/sm_5ac9b8967574d.jpg',
          }}
          size={(width * 2) / 3}
          style={styles.img}
        />
        <View style={[styles.handleStepRow, {width: (width * 2) / 3}]}>
          <TouchableOpacity
            onPress={() => {
              handleReloadImg();
            }}>
            <Text style={styles.handleStepButtonText}>{textReloadImg}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handleNextImg();
            }}>
            <Text style={[styles.handleStepButtonText, styles.redText]}>
              {textNextImg}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Dòng trên */}
        <View style={styles.row}>
          {selectedLetters.map((letter, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.tile, styles.tileColorSelected]}
              onPress={() => handleRemoveLetter(index)}>
              <Text style={[styles.tileText, styles.textColorSelected]}>
                {letter}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Dòng dưới */}
        <View style={styles.row}>
          {availableLetters.map((letter, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.tile,
                styles.tileColorAvailable,
                {opacity: letter ? 1 : 0}, // Ẩn khi letter === null
              ]}
              onPress={() => handleSelectLetter(letter, index)}
              disabled={!letter} // Không cho bấm nếu letter === null
            >
              <Text style={[styles.tileText, styles.textColorAvailable]}>
                {letter}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <UIHeader
        title={'Đuổi Hình Xếp Chữ'}
        leftIconName={icons.backIcon}
        rightIconName={null}
        onPressLeftIcon={() => {
          goBack();
        }}
        onPressRightIcon={null}
        mainStyle={styles.UIHeaderMainStyle}
        iconStyle={styles.UIHeaderIconStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundWhite,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    position: 'absolute',
  },
  //
  UIHeaderMainStyle: {
    top: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    backgroundColor: null,
  },
  UIHeaderIconStyle: {tintColor: colors.inactive},
  //
  mainView: {
    width: '90%',
    padding: 15,
    backgroundColor: colors.transparentWhite,
    borderColor: colors.PrimaryOnContainerAndFixed,
    borderWidth: 2,
    borderRadius: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    borderRadius: 10,
    borderColor: colors.inactive,
    borderWidth: 3,
    resizeMode: 'stretch',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Cho phép xuống dòng
    justifyContent: 'center',
    marginTop: 20,
  },
  tile: {
    width: '16%', // Chiều rộng linh hoạt (16% đảm bảo 6 ô trên 1 dòng với khoảng cách)
    aspectRatio: 1, // Duy trì tỉ lệ vuông
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.TertiaryOnContainerAndFixed,
  },
  tileColorSelected: {
    backgroundColor: colors.TertiaryContainer,
  },
  tileColorAvailable: {
    backgroundColor: colors.TertiaryBackground,
  },
  tileText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  textColorSelected: {
    color: colors.TertiaryOnContainerAndFixed,
  },
  textColorAvailable: {
    color: colors.TertiaryContainer,
  },
  //
  handleStepRow: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: '1%',
  },
  handleStepButtonText: {
    fontSize: fontSizes.h6,
    fontWeight: 'bold',
    color: colors.GrayBackground,
  },
  redText: {
    fontSize: fontSizes.h7,
    textAlign: 'right',
    color: colors.RedLightBackground,
  },
});
