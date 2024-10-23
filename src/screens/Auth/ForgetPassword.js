import React, {useState} from 'react';
import {Text, View, Image, StyleSheet, Dimensions} from 'react-native';
import {images, icons, colors, fontSizes} from '../../constants/index';
import {
  UIHeader,
  MiddleSingleMediumButton,
  TextInputMediumIcon,
} from '../../components';
import {auth_getRecoveryCode} from '../../api';

export default ForgetPassword = props => {
  const {navigate, goBack} = props.navigation;
  const {width, height} = Dimensions.get('window');

  //use for api
  const [username, setUsername] = useState('.');
  const handleForgetPassword = async () => {
    /* 
    try {
      const apiPath = await auth_getRecoveryCode(username);

      navigate("Verification", {
        api: apiPath,
        userName: username,
        actionType: "ForgetPassword",
      });
    } catch (Error) {
      console.error(Error.message);
    } */
    navigate('Verification', {
      api: null,
      userName: null,
      actionType: 'ForgetPassword',
    });
  };

  return (
    <View style={styles.container}>
      <Image
        source={images.background}
        style={[
          {
            width: width,
            height: height,
          },
          styles.background,
        ]}
      />

      <Text style={styles.titleText}>Quên mật khẩu?</Text>
      <View style={styles.mainView}>
        <TextInputMediumIcon
          inputMode={'text'}
          icon={icons.personIcon}
          placeholder={'Nhập tên đăng nhập của bạn'}
          isPassword={false}
          onChangeText={text => setUsername(text)}
        />
        <MiddleSingleMediumButton
          onPress={handleForgetPassword}
          title={'tiếp tục'.toUpperCase()}
        />
      </View>

      <UIHeader
        title={null}
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
  UIHeaderMainStyle: {
    top: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    backgroundColor: null,
  },
  UIHeaderIconStyle: {tintColor: colors.inactive},
  titleText: {
    marginVertical: 10,
    color: colors.PrimaryOnContainerAndFixed,
    fontSize: fontSizes.h1,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
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
});
