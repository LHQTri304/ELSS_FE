import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {images, icons, colors, fontSizes} from '../../constants/index';
import {UIHeader, TextInputTransparent} from '../../components';
import {
  user_register,
  user_createAccountData,
  information_initialize,
} from '../../api';
//import { RadioButton } from "react-native-paper";
//import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import ProgressSteps, {
  Title,
  Content,
} from '@joaosousa/react-native-progress-steps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {user_checkInfo} from '../../api/AuthScreens/user_register';

//
import axios from 'axios';
const URL = 'http://192.168.132.41:3000';

export default RegistrationTemp = props => {
  const {navigate, goBack} = props.navigation;
  const {width, height} = Dimensions.get('window');
  const [currentStep, setCurrentStep] = useState(0);

  //basic info
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');

  //newUser & OTP
  const [newUser, setNewUser] = useState('');
  const [systemOTP, setSystemOTP] = useState('');
  const [inputOTP, setInputOTP] = useState('');
  const [infoID, setInfoID] = useState('');

  //additional info
  const [gender, setGender] = useState('Nam');
  const [phoneNumber, setPhoneNumber] = useState('00000000000');
  const [yearOfBirth, setYearOfBirth] = useState('0000');
  const [description, setDescription] = useState('Giới thiệu về bạn ...');
  const [jwtToken, setJwtToken] = useState(null);

  //use for api
  const handleRegister = async () => {
    /* 
    if ((await user_checkInfo(username, password, email, rePassword)) == true) {
      setCurrentStep(1);
      const result = await user_register(username, password, email, rePassword);
      if (result) {
        setNewUser(result.newUser);
        setSystemOTP(result.otp);
      }
    } */
    if (!username || !email || !password || !rePassword)
      return alert('error');
    if (password !== rePassword) return alert('Passwords do not match');
    try {
      /* await axios.post */console.log(URL + '/register', {username, email, password});
      //handleNextStep();
    } catch (error) {
      alert('Error during registration');
    }
  };

  //use for api: Registration
  const handleVerification_Registration = async () => {
    /* alert(
      `Registration: otp từ hệ thống: ${systemOTP}, từ màn hình: ${inputOTP},`
    );
    if (systemOTP == inputOTP) {
      const dataResponse = await user_createAccountData(newUser);
      if (dataResponse.status == 200 && dataResponse.data.jwtToken != null) {
        setJwtToken(dataResponse.data.jwtToken);
        setInfoID(dataResponse.data.infoID);
        setCurrentStep(2);
      } else {
        //unsuccessful
        alert("Đã có lỗi xảy ra, vui lòng thử lại");
      }
    } else {
      //alert("OTP không đúng");
    } */
    try {
      await axios.post(URL + '/verify-otp', {username, inputOTP});
      goBack();
    } catch (error) {
      alert('Invalid OTP');
    }
  };

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };
  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
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

      <View style={styles.mainView}>
        <ProgressSteps
          currentStep={currentStep}
          steps={[
            {
              id: 1,
              title: <Title>Thông tin tài khoản</Title>,
              content: (
                <Content>
                  <TextInputTransparent
                    inputMode={'text'}
                    icon={icons.personIcon}
                    placeholder={'Username'}
                    onChangeText={setUsername}
                  />
                  <TextInputTransparent
                    inputMode={'email'}
                    icon={icons.emailIcon}
                    placeholder={'Email'}
                    onChangeText={setEmail}
                  />
                  <TextInputTransparent
                    inputMode={'text'}
                    icon={icons.keyIcon}
                    placeholder={'Password'}
                    isPassword={true}
                    onChangeText={setPassword}
                  />
                  <TextInputTransparent
                    inputMode={'text'}
                    icon={icons.addKeyIcon}
                    placeholder={'Re-enter Password'}
                    isPassword={true}
                    onChangeText={setRePassword}
                  />
                  <View style={styles.handleStepRow}>
                    <View />
                    <TouchableOpacity
                      onPress={() => {
                        handleRegister();
                        //handleNextStep();
                      }}>
                      <Text
                        style={[styles.handleStepButtonText, styles.redText]}>
                        Đăng Ký
                      </Text>
                    </TouchableOpacity>
                  </View>
                </Content>
              ),
            },
            {
              id: 2,
              title: <Title>Xác thực OTP</Title>,
              content: (
                <Content>
                  <TextInputTransparent
                    inputMode={'text'}
                    icon={icons.emailCheckMarkIcon}
                    placeholder={'Nhập mã xác thực'}
                    isPassword={true}
                    onChangeText={setInputOTP}
                  />
                  <View style={styles.handleStepRow}>
                    <TouchableOpacity
                      onPress={() => {
                        handlePrevStep();
                      }}>
                      <Text style={styles.handleStepButtonText}>Quay Lại</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        handleVerification_Registration();
                        //handleNextStep();
                      }}>
                      <Text
                        style={[styles.handleStepButtonText, styles.redText]}>
                        Tiếp Theo
                      </Text>
                    </TouchableOpacity>
                  </View>
                </Content>
              ),
            } /* 
            {
              id: 3,
              title: <Title>Thông tin thêm: Giới tính</Title>,
              content: (
                <Content>
                  <TextInputTransparent
                    inputMode={'text'}
                    icon={icons.genderEqualityIcon}
                    placeholder={'Nhập giới tính'}
                    onChangeText={gender => setGender(gender)}
                  />
                  <View style={styles.handleStepRow}>
                    <TouchableOpacity
                      onPress={() => {
                        handlePrevStep();
                      }}>
                      <Text style={styles.handleStepButtonText}>Quay Lại</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        handleNextStep();
                      }}>
                      <Text
                        style={[styles.handleStepButtonText, styles.redText]}>
                        Tiếp Theo
                      </Text>
                    </TouchableOpacity>
                  </View>
                </Content>
              ),
            },
            {
              id: 4,
              title: <Title>Thông tin thêm: Số Điện Thoại</Title>,
              content: (
                <Content>
                  <TextInputTransparent
                    inputMode={'numeric'}
                    icon={icons.phoneIcon}
                    placeholder={'Nhập số điện thoại'}
                    onChangeText={number => setPhoneNumber(number)}
                  />
                  <View style={styles.handleStepRow}>
                    <TouchableOpacity
                      onPress={() => {
                        handlePrevStep();
                      }}>
                      <Text style={styles.handleStepButtonText}>Quay Lại</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        handleNextStep();
                      }}>
                      <Text
                        style={[styles.handleStepButtonText, styles.redText]}>
                        Tiếp Theo
                      </Text>
                    </TouchableOpacity>
                  </View>
                </Content>
              ),
            },
            {
              id: 5,
              title: <Title>Thông tin thêm: Năm Sinh</Title>,
              content: (
                <Content>
                  <TextInputTransparent
                    inputMode={'numeric'}
                    icon={icons.birthdayCakeIcon}
                    placeholder={'Nhập năm sinh'}
                    onChangeText={number => setYearOfBirth(number)}
                  />
                  <View style={styles.handleStepRow}>
                    <TouchableOpacity
                      onPress={() => {
                        handlePrevStep();
                      }}>
                      <Text style={styles.handleStepButtonText}>Quay Lại</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        goBack();
                      }}>
                      <Text
                        style={[styles.handleStepButtonText, styles.redText]}>
                        Hoàn tất
                      </Text>
                    </TouchableOpacity>
                  </View>
                </Content>
              ),
            }, */,
          ]}
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
    flex: 1,
    backgroundColor: colors.PrimaryContainer,
  },
  background: {
    position: 'absolute',
  },
  mainView: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    top: '10%',
    left: 1,
    right: 1,
    paddingTop: '5%',
    paddingHorizontal: '5%',
    borderColor: colors.transparentWhite,
    borderWidth: 2,
    borderTopEndRadius: 50,
    borderTopStartRadius: 50,
    backgroundColor: colors.transparentWhite,
  },
  handleStepRow: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingRight: '5%',
    paddingLeft: '10%',
  },
  handleStepButtonText: {
    fontSize: fontSizes.h6,
    fontWeight: 'bold',
    color: colors.PrimaryBackground,
  },
  redText: {
    color: colors.RedLightBackground,
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
});
