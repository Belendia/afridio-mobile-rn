import React, {useState, useEffect} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Input, Button, Divider} from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import * as Yup from 'yup';
import {useFormik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';

import {Text, View} from '../../components/Themed';
import {
  AuthContainer,
  ProgressBar,
  FormError,
  PhoneInput,
} from '../../components';
import {authStart} from '../../redux/slices/authSlice';
import {RootStoreType} from '../../redux/rootReducer';
import {colors} from '../../constants/Colors';

let SignInSchema = Yup.object().shape({
  phone_number: Yup.number()
    .typeError('Phone must be a number')
    .positive('Phone must be a positive number')
    .required('Required')
    .test(
      'len',
      'Too short!',
      value =>
        value != undefined && value != null && value.toString().length >= 6,
    )
    .test(
      'len',
      'Too long!',
      value =>
        value != undefined && value != null && value.toString().length <= 15,
    ),
  password: Yup.string()
    .min(8, 'Too short!')
    .max(30, 'Too long!')
    .required('Required'),
});

const SignInScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [countryCode, setCountryCode] = useState<string>('251');

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: {phone_number: '', password: '', remember: true},
    validationSchema: SignInSchema,
    onSubmit: values => {
      dispatch(
        authStart({
          phone_number: '+' + countryCode + values.phone_number,
          password: values.password,
        }),
      );
    },
  });

  //redux
  const {authenticating, authenticated, authError, readingToken} = useSelector(
    (state: RootStoreType) => ({
      authenticating: state.authReducer.authenticating,
      authenticated: state.authReducer.authenticated,
      authError: state.authReducer.authError,
      readingToken: state.authReducer.readingToken,
    }),
  );

  useEffect(() => {
    if (
      typeof authError == 'string' &&
      authError === 'Please verify your phone.'
    ) {
      navigation.navigate('VerifyScreen');
    }
  }, [authError]);

  return readingToken ? (
    <View style={styles.progressBar}>
      <ProgressBar />
    </View>
  ) : (
    <AuthContainer showLogo={true} title={'Sign In'}>
      <PhoneInput
        errorMessage={errors.phone_number}
        style={styles.phone}
        onChangePhoneNumber={phone => {
          setFieldValue('phone_number', phone);
        }}
        onChangeCountryCode={code => {
          setCountryCode(code);
        }}
      />

      <Input
        // ref={password}
        placeholder="Password"
        leftIconContainerStyle={{marginRight: 6}}
        leftIcon={<FontAwesome name="lock" size={20} color={colors.red300} />}
        onChangeText={handleChange('password')}
        onBlur={handleBlur('phone_number')}
        errorMessage={errors.password}
        style={styles.input}
        inputContainerStyle={styles.inputContainer}
        placeholderTextColor={colors.black700}
        secureTextEntry
        returnKeyType="go"
        returnKeyLabel="Go"
      />
      <Button
        title="Sign In"
        buttonStyle={{
          backgroundColor: colors.red800,
          paddingVertical: 12,
        }}
        titleStyle={{fontSize: 16, fontWeight: '600'}}
        containerStyle={{marginTop: 10}}
        onPress={() => {
          if (!authenticating) handleSubmit();
        }}
        loading={authenticating}
      />
      {authError && typeof authError == 'string' && (
        <FormError error={authError} />
      )}

      <Divider style={{backgroundColor: colors.black700, marginTop: 20}} />
      <TouchableOpacity
        style={styles.footerTextWrapper}
        onPress={() => navigation.navigate('SignUpScreen')}>
        <Text style={styles.footerWhiteText}>New to </Text>
        <Text style={styles.footerRedText}>Afridio?</Text>
        <Text style={styles.footerWhiteText}> Sign up now.</Text>
      </TouchableOpacity>
    </AuthContainer>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  footerTextWrapper: {
    marginVertical: 25,
    marginHorizontal: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  footerRedText: {
    color: colors.red400,
    fontSize: 16,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  footerWhiteText: {
    color: colors.red300,
    fontSize: 16,
    alignSelf: 'center',
  },
  progressBar: {
    backgroundColor: colors.black800,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    color: colors.red300,
  },
  inputContainer: {
    borderBottomColor: colors.red800,
  },
  phone: {
    marginBottom: 20,
  },
});
