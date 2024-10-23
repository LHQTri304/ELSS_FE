import React, {useState} from 'react';
import {Text, View, Image, StyleSheet, Dimensions} from 'react-native';
import {images, icons, colors, fontSizes} from '../../constants/index';
import {
  UIHeader,
  MiddleSingleMediumButton,
  TextInputMediumIcon,
} from '../../components';
import { auth_changePasswordAfterOTP } from "../../api";

export default ResetPassword = (props) => {
  const { navigate, goBack } = props.navigation;
  const {width, height} = Dimensions.get('window');

  //use for api
  //const { userName } = props.route.params;

  const [password, setPassword] = useState("none");
  const [rePassword, setRePassword] = useState("none");
  const handleResetPassword = async () => {/* 
    try {
      if (password == rePassword && password.length > 8) {
        const response = await auth_changePasswordAfterOTP(userName, password);
        if (response.data == true) {
          alert("Thay đổi thành công");
          navigate("Login");
        } else {
          alert("Network Error !");
        }
      } else {
        alert(
          "Không thành công, đảm bảo mật khẩu mới và nhập lại mật khẩu phải giống nhau và có tối thiểu 9 kí tự"
        );
      }
    } catch (Error) {
      console.error(Error.message);
    } */
      navigate("Login");
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

      <Text style={styles.titleText}>Đặt lại mật khẩu!</Text>
      <View style={styles.mainView}>
        <TextInputMediumIcon
          inputMode={'text'}
          icon={icons.typePasswordIcon}
          placeholder={'Nhập mật khẩu mới'}
          isPassword={true}
          onChangeText={text => setPassword(text)}
        />
        <TextInputMediumIcon
          inputMode={'text'}
          icon={icons.reTypePasswordIcon}
          placeholder={'Nhập lại mật khẩu'}
          isPassword={true}
          onChangeText={text => setRePassword(text)}
        />
        <MiddleSingleMediumButton
          onPress={handleResetPassword}
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
