import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {images, icons, colors, fontSizes} from '../../constants/index';
import {
  MiddleSingleMediumButton,
  TextInputTransparent,
} from '../../components';
import {user_login} from '../../api';

export default Login = props => {
  const {navigate, goBack, push} = props.navigation;

  //Login component and function, use for api
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = () => {
    push('UserProfile');
    /* user_login(username, password, () =>
      push("MainBottomTab", { tabName: "UserProfile" })
    ); */
  };

  return (
    <View style={styles.container}>
      <Image source={images.appLogo} style={styles.imgLogo} />

      <View style={styles.mainView}>
        <TextInputTransparent
          inputMode={'text'}
          icon={icons.personIcon}
          placeholder={'Username'}
          isPassword={false}
          onChangeText={text => {
            setUsername(text);
          }}
        />
        <TextInputTransparent
          inputMode={'text'}
          icon={icons.keyIcon}
          placeholder={'Password'}
          isPassword={true}
          onChangeText={text => {
            setPassword(text);
          }}
        />

        <View style={styles.navigateTextView}>
          <TouchableOpacity
            onPress={() => {
              navigate('ForgetPassword');
            }}
            style={styles.forgetPassword}>
            <Text style={styles.navigateTextText}>Quên mật khẩu?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigate('Registration');
            }}
            style={styles.register}>
            <Text style={styles.navigateTextText}>Đăng ký</Text>
          </TouchableOpacity>
        </View>

        <MiddleSingleMediumButton
          onPress={handleLogin}
          title={'Đăng nhập'.toUpperCase()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.PrimaryContainer,
    flex: 1,
  },
  imgLogo: {
    width: 200,
    height: 200,
    top: '10%',
    position: 'absolute',
    alignSelf: 'center',
  },
  mainView: {
    flex: 1,
    position: 'absolute',
    bottom:0,
    top: '33%',
    left:1,
    right:1,
    paddingTop: 40,
    borderColor: colors.transparentWhite,
    borderWidth: 2,
    borderTopEndRadius: 50,
    borderTopStartRadius: 50,
    backgroundColor: colors.transparentWhite,
  },
  textInputView: {
    flexDirection: 'row',
    marginLeft: 20,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 40,
    alignItems: 'center',
  },
  textInputTypingArea: {
    width: 300,
    height: 55,
  },
  blackLine: {
    height: 1,
    backgroundColor: 'black',
  },
  navigateTextView: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    paddingEnd: 10,
  },
  navigateTextText: {
    padding: 1,
    fontSize: fontSizes.h6,
    fontWeight: 'bold',
    color: colors.PrimaryBackground,
  },
  forgetPassword: {
    marginHorizontal: 5,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  register: {
    marginHorizontal: 5,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});
