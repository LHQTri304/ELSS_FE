import React, { useState } from "react";
import {Text, View, Image, StyleSheet, Dimensions} from 'react-native';
import { images, icons, colors, fontSizes } from "../../constants/index";
import { UIHeader, TextInputMediumIcon, MiddleSingleMediumButton } from "../../components";
import { user_profile_changePassword } from "../../api";

const ResetPasswordInProfile = (props) => {
  const { navigate, goBack, push } = props.navigation;
  const {width, height} = Dimensions.get('window');

  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("none");
  const [rePassword, setRePassword] = useState("none");

  //use for api
  const handleResetPassword = async () => {/* 
    try {
      if (password == rePassword && password.length > 8) {
        const response = await user_profile_changePassword(currentPassword, password);
        if (response.data == "Successful") {
          alert("Đổi thành công");
          goBack();
          setCurrentPassword("");
          setPassword("");
          setRePassword("");
        } else {
          alert("Đổi không thành công");
        }
      }else {
        alert("Thông tin bạn nhập không đúng, vui lòng nhập lại. Mật khẩu cần tối thiểu 9 ký tự.");}
    } catch (Error) {
      console.error(Error.message);
    } */
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
          placeholder={'Nhập mật khẩu hiện tại'}
          isPassword={true}
          onChangeText={text => setPassword(text)}
        />
        <TextInputMediumIcon
          inputMode={'text'}
          icon={icons.typeNewPasswordIcon}
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
export default ResetPasswordInProfile;

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
