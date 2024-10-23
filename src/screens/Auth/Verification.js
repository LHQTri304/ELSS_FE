import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {images, icons, colors, fontSizes} from '../../constants/index';
import {
  UIHeader,
  MiddleSingleMediumButton,
  TextInputMediumIcon,
} from '../../components';
import {auth_getAuthOTP, user_createAccountData} from '../../api';

export default Verification = props => {
  const {userName, api, newUser, otp, actionType} = props.route.params;
  //userName, api are for ForgetPassword
  //newUser, otp are for Registration
  //actionType: ForgetPassword (0) - Registration (1)

  const {navigate, goBack} = props.navigation;
  const {width, height} = Dimensions.get('window');

  //use for api: ForgetPassword
  const [OTP, setOTP] = useState('-1');
  const [otpFromAPI, setOtpFromAPI] = useState('');

  /* useEffect(() => {
    const fetchData = async () => {
      const getAuthOTP = await auth_getAuthOTP(api);
      setOtpFromAPI(getAuthOTP);
    };
    fetchData();
  }, [props.userName]); */

  const handleVerification_ForgetPassword = async () => {
    /* 
    alert(`ForgetPassword: otp từ hệ thống: ${otpFromAPI}, từ màn hình: ${OTP},`);

    if (otpFromAPI == OTP) {
      navigate("ResetPassword", {
        userName: userName,
      });
    } else {
      //alert("OTP không đúng");
    } */
    navigate('ResetPassword', {
      userName: null,
    });
  };

  //use for api: Registration
  const handleVerification_Registration = async () => {
    /* 
    alert(`Registration: otp từ hệ thống: ${otp}, từ màn hình: ${OTP},`);

    if (otp == OTP) {
      const dataResponse = await user_createAccountData(newUser);
      if (dataResponse == newUser.userName) {
        alert("Đăng ký thành công, hãy đăng nhập và trải nghiệm");
        navigate("Login");
      } else {
        //unsuccessful
        alert("Đã có lỗi xảy ra, vui lòng thử lại");
      }
    } else {
      //alert("OTP không đúng");
    } */
    navigate('Login');
  };

  //final handleVerification
  const handleVerification = async () => {
    if (actionType === 0 || actionType === 'ForgetPassword') {
      handleVerification_ForgetPassword();
    } else if (actionType === 1 || actionType === 'Registration') {
      handleVerification_Registration();
    }
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

      <Text style={styles.titleText}>Xác thực email</Text>
      <View style={styles.mainView}>
        <TextInputMediumIcon
          inputMode={'numeric'}
          icon={icons.emailCheckMarkIcon}
          placeholder={'Nhập mã xác thực'}
          isPassword={false}
          maxLength={6}
          onChangeText={number => setOTP(number)}
        />
        <MiddleSingleMediumButton
          onPress={handleVerification}
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
