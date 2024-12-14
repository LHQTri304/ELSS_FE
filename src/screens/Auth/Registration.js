import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  StyleSheet,
} from 'react-native';
import {images, icons, colors, fontSizes} from '../../constants';
import {UIHeader, TextInputTransparent} from '../../components';
//
import axios from 'axios';
import {EnterMessageBar} from '../../components';
const URL = 'http://192.168.132.41:3000';

export default Registration = props => {
  const {navigate, goBack} = props.navigation;

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [otp, setOtp] = useState('');

  const [stepOTP, setStepOTP] = useState(false);

  const handleRegister = async () => {
    if (!username || !email || !password || !confirmPassword)
      return alert('error');
    if (password !== confirmPassword) return alert('Passwords do not match');
    try {
      console.log('http://192.168.132.41:3000/register', {
        username,
        email,
        password,
      });
      await axios.post('http://192.168.132.41:3000/register', {
        username,
        email,
        password,
      });
      setStepOTP(true);
    } catch (error) {
      alert('Error during registration');
      console.log(error);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      await axios.post('http://192.168.132.41:3000/verify-otp', {
        username,
        otp,
      });
      goBack();
    } catch (error) {
      alert('Invalid OTP');
    }
  };

  return (
    <View style={styles.container}>
      {!stepOTP ? (
        <View style={styles.mainView}>
          <TextInputTransparent
            inputMode={'text'}
            icon={icons.personIcon}
            placeholder={'Username'}
            onChangeText={setUsername}
            value={username}
          />
          <TextInputTransparent
            inputMode={'email'}
            icon={icons.emailIcon}
            placeholder={'Email'}
            onChangeText={setEmail}
            value={email}
          />
          <TextInputTransparent
            inputMode={'text'}
            icon={icons.keyIcon}
            placeholder={'Password'}
            isPassword={true}
            onChangeText={setPassword}
            value={password}
          />
          <TextInputTransparent
            inputMode={'text'}
            icon={icons.addKeyIcon}
            placeholder={'Re-enter Password'}
            isPassword={true}
            onChangeText={setConfirmPassword}
            value={confirmPassword}
          />
          <View style={styles.handleStepRow}>
            <View />
            <TouchableOpacity
              onPress={() => {
                handleRegister();
              }}>
              <Text style={[styles.handleStepButtonText, styles.redText]}>
                Đăng Ký
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.mainView}>
          <TextInputTransparent
            inputMode={'numeric'}
            icon={icons.addKeyIcon}
            placeholder={'Enter OTP'}
            isPassword={true}
            onChangeText={setOtp}
            value={otp}
          />
          <View style={styles.handleStepRow}>
            <View />
            <TouchableOpacity
              onPress={() => {
                handleVerifyOtp();
              }}>
              <Text style={[styles.handleStepButtonText, styles.redText]}>
                Xác thực OTP
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

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
  input: {borderWidth: 1, marginBottom: 10, padding: 8},
  container: {
    flex: 1,
    backgroundColor: colors.PrimaryContainer,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    position: 'absolute',
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
