import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {Input, Button} from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as Yup from 'yup';
import {useFormik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {
  AuthContainer,
  DateInput,
  OptionsInput,
  Option,
  FormError,
  PhoneInput,
} from '../../components';
import {SexOptions} from '../../constants/Options';
import {colors} from '../../constants/Colors';
import {RootStoreType} from '../../redux/rootReducer';
import {startRegistration, resetRegError} from '../../redux/slices/authSlice';

let SignUpSchema = Yup.object().shape({
  name: Yup.string().min(3, 'Too short!').required('Required'),
  phone_number: Yup.number()
    .positive('Phone must be a positive number')
    .typeError('Phone must be a number')
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
  date_of_birth: Yup.string().required('Required'),
  sex: Yup.string().required('Required'),
  password: Yup.string()
    .min(8, 'Too short!')
    .max(30, 'Too long!')
    .required('Required'),
  password2: Yup.string()
    .equals([Yup.ref('password')], "Passwords don't match")
    .required('Required'),
});

const SignUpScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [sex, setSex] = useState<Option | undefined>(undefined);
  const [countryCode, setCountryCode] = useState<string>('251');

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    touched,
    setFieldValue,
    setErrors,
  } = useFormik({
    initialValues: {
      name: '',
      phone_number: '',
      sex: '',
      date_of_birth: '',
      password: '',
      password2: '',
    },
    validationSchema: SignUpSchema,
    onSubmit: values => {
      dispatch(
        startRegistration({
          phone_number: '+' + countryCode + values.phone_number,
          name: values.name,
          date_of_birth: values.date_of_birth,
          sex: values.sex,
          password: values.password,
          password2: values.password2,
        }),
      );
    },
  });

  //redux
  const {registering, registered, regError} = useSelector(
    (state: RootStoreType) => ({
      registering: state.authReducer.registering,
      registered: state.authReducer.registered,
      regError: state.authReducer.regError,
    }),
  );

  useEffect(() => {
    if (regError) {
      setErrors(regError);
    }
  }, [regError]);

  useEffect(() => {
    return () => {
      dispatch(resetRegError(null));
    };
  }, []);

  useEffect(() => {
    if (registered) {
      navigation.navigate('VerifyScreen');
    }
  }, [registered]);

  return (
    <AuthContainer showLogo={true} title={'Sign Up'}>
      <Input
        placeholder="Name"
        leftIconContainerStyle={{marginRight: 6}}
        leftIcon={<FontAwesome name="user" size={20} color={colors.red300} />}
        onChangeText={handleChange('name')}
        onBlur={handleBlur('name')}
        errorMessage={errors.name}
        style={styles.input}
        inputContainerStyle={styles.inputContainer}
        placeholderTextColor={colors.black700}
        returnKeyType="next"
      />

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
      <DateInput
        title="Birth date"
        bottomDivider={false}
        iconName={'event'}
        errorMessage={errors.date_of_birth}
        onSubmit={date => {
          setFieldValue(
            'date_of_birth',
            date.getFullYear() +
              '-' +
              (date.getMonth() + 1) +
              '-' +
              date.getDate(),
          );
        }}
      />
      <OptionsInput
        title={'Sex'}
        iconName={'user-female'}
        values={SexOptions}
        defaultValue={sex}
        bottomDivider={false}
        errorMessage={errors.sex}
        onPress={selectedSex => {
          setFieldValue('sex', selectedSex.key);
          setSex(selectedSex);
        }}
      />
      <Input
        placeholder="Password"
        leftIconContainerStyle={{marginRight: 6}}
        leftIcon={<FontAwesome name="lock" size={20} color={colors.red300} />}
        onChangeText={handleChange('password')}
        onBlur={handleBlur('password')}
        errorMessage={errors.password}
        style={styles.input}
        inputContainerStyle={styles.inputContainer}
        placeholderTextColor={colors.black700}
        secureTextEntry
        returnKeyType="next"
      />
      <Input
        placeholder="Confirm Password"
        leftIconContainerStyle={{marginRight: 6}}
        leftIcon={<FontAwesome name="lock" size={20} color={colors.red300} />}
        onChangeText={handleChange('password2')}
        onBlur={handleBlur('password2')}
        errorMessage={errors.password2}
        style={styles.input}
        inputContainerStyle={styles.inputContainer}
        placeholderTextColor={colors.black700}
        secureTextEntry
        returnKeyType="go"
      />
      <Button
        title="Register"
        buttonStyle={{
          backgroundColor: colors.red800,
          paddingVertical: 12,
        }}
        titleStyle={{fontSize: 16, fontWeight: '600'}}
        containerStyle={{marginTop: 10, marginBottom: 10}}
        onPress={() => {
          if (!registering) handleSubmit();
        }}
        loading={registering}
      />

      {regError && typeof regError == 'string' && (
        <FormError error={regError} style={{marginBottom: 10}} />
      )}
    </AuthContainer>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
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
