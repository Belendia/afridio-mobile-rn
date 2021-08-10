import React, {useEffect, useState} from 'react';
import {StyleSheet, ScrollView, SafeAreaView} from 'react-native';
import {Input, Button, Divider} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useFormik} from 'formik';
import * as Yup from 'yup';

import {Text, View} from '../../components/Themed';
import {colors} from '../../constants/Colors';
import {RootStoreType} from '../../redux/rootReducer';

let ChangePasswordSchema = Yup.object().shape({
  old_password: Yup.string()
    .min(8, 'Too short!')
    .max(30, 'Too long!')
    .required('Required'),
  password: Yup.string()
    .min(8, 'Too short!')
    .max(30, 'Too long!')
    .required('Required'),
  password2: Yup.string()
    .min(8, 'Too short!')
    .max(30, 'Too long!')
    .required('Required'),
});

const ChangePasswordScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: {old_password: '', password: '', password2: ''},
    validationSchema: ChangePasswordSchema,
    onSubmit: values => {
      // dispatch(
      //   authStart({
      //     phone_number: '+' + countryCode + values.phone_number,
      //     password: values.password,
      //   }),
      // );
    },
  });

  const {user, syncUserData, library} = useSelector((state: RootStoreType) => ({
    user: state.authReducer.user,
    syncUserData: state.authReducer.syncUserData,
    library: state.mediaReducer.library,
  }));

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <Text style={styles.title}>Change Password</Text>

        <View style={styles.card}>
          <View style={styles.inputsContainer}>
            <Input
              // ref={password}
              placeholder="Old Password"
              leftIconContainerStyle={{marginRight: 6}}
              leftIcon={
                <FontAwesome name="lock" size={20} color={colors.red300} />
              }
              onChangeText={handleChange('old_password')}
              onBlur={handleBlur('old_password')}
              errorMessage={errors.old_password}
              style={{color: colors.red300}}
              inputContainerStyle={{
                borderBottomColor: colors.red800,
                borderBottomWidth: 0.3,
              }}
              placeholderTextColor={colors.black700}
              secureTextEntry
              returnKeyType="next"
              returnKeyLabel="Next"
            />
            <Input
              // ref={password}
              placeholder="Password"
              leftIconContainerStyle={{marginRight: 6}}
              leftIcon={
                <FontAwesome name="lock" size={20} color={colors.red300} />
              }
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              errorMessage={errors.password}
              style={{color: colors.red300}}
              inputContainerStyle={{
                borderBottomColor: colors.red800,
                borderBottomWidth: 0.3,
              }}
              placeholderTextColor={colors.black700}
              secureTextEntry
              returnKeyType="next"
              returnKeyLabel="Next"
            />
            <Input
              // ref={password}
              placeholder="Repeat Password"
              leftIconContainerStyle={{marginRight: 6}}
              leftIcon={
                <FontAwesome name="lock" size={20} color={colors.red300} />
              }
              onChangeText={handleChange('password2')}
              onBlur={handleBlur('password2')}
              errorMessage={errors.password2}
              style={{color: colors.red300}}
              inputContainerStyle={{
                borderBottomColor: colors.red800,
                borderBottomWidth: 0.3,
              }}
              placeholderTextColor={colors.black700}
              secureTextEntry
              returnKeyType="go"
              returnKeyLabel="Go"
            />

            <Button
              title="Change"
              buttonStyle={{
                backgroundColor: colors.red800,
                paddingVertical: 12,
              }}
              titleStyle={{fontSize: 16, fontWeight: '600'}}
              containerStyle={{marginTop: 10}}
              onPress={() => {
                // if (!authenticating) handleSubmit();
              }}
              loading={false}
            />
            {/* {authError && typeof authError == 'string' && (
        <FormError error={authError} />
      )} */}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChangePasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    borderRadius: 10,
    backgroundColor: colors.black600,
    marginHorizontal: 10,
    paddingVertical: 5,
  },

  title: {
    color: colors.black300,
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 5,
    marginTop: 15,
    marginBottom: 10,
  },
  inputsContainer: {
    marginHorizontal: 8,
    marginVertical: 12,
    backgroundColor: 'transparent',
  },
});
