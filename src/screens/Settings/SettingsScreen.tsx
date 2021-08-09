import React, {useEffect, useState} from 'react';
import {StyleSheet, ScrollView, SafeAreaView} from 'react-native';
import {ListItem} from 'react-native-elements';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {useDispatch, useSelector} from 'react-redux';

import {Text, View} from '../../components/Themed';
import {
  authLogout,
  setDateOfBirth,
  setName,
  setSex,
} from '../../redux/slices/authSlice';
import {
  DateInput,
  EditableText,
  OptionsInput,
  SexOption,
} from '../../components';
import {SexOptions, SettingsMoreOptions} from '../../constants/Options';
import {colors} from '../../constants/Colors';
import {RootStoreType} from '../../redux/rootReducer';
import {formatDate, titleCase} from '../../helpers/Utils';

const SettingsScreen = () => {
  const dispatch = useDispatch();
  const [sex, setSexOption] = useState<SexOption>({key: 'male', value: 'Male'});

  const moreOptionsLength = SettingsMoreOptions.length;

  const {user, userDataSynced} = useSelector((state: RootStoreType) => ({
    user: state.authReducer.user,
    userDataSynced: state.authReducer.userDataSynced,
  }));

  const menuActions = (menu: string) => {
    if (menu == 'Sign out') {
      dispatch(authLogout('logout'));
    }
  };

  useEffect(() => {
    if (user?.sex) {
      setSexOption({key: user?.sex.toUpperCase(), value: titleCase(user?.sex)});
    }
  }, [user?.sex]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <Text style={styles.title}>Account</Text>

        <View style={styles.card}>
          <View style={styles.inputsContainer}>
            <EditableText
              bottomDivider
              title="Phone"
              value={user?.phone_number}
              iconName={'phone'}
              editable={false}
              keyboardType={'phone-pad'}
            />
            <EditableText
              bottomDivider
              onChangeText={text => dispatch(setName(text))}
              title="Name"
              value={user?.name}
              iconName={'user'}
            />
            <DateInput
              title="Birth date"
              bottomDivider
              iconName={'event'}
              value={
                user?.date_of_birth ? new Date(user.date_of_birth) : undefined
              }
              onSubmit={date => dispatch(setDateOfBirth(formatDate(date)))}
            />
            <OptionsInput
              title={'Sex'}
              iconName={'user-female'}
              values={SexOptions}
              bottomDivider={false}
              defaultValue={sex}
              style={{marginLeft: 30}}
              onPress={selectedSex => {
                dispatch(setSex(selectedSex.key));
              }}
            />
          </View>
        </View>

        <Text style={styles.title}>More options</Text>
        <View style={styles.card}>
          {SettingsMoreOptions.map((s, i) => (
            <ListItem
              key={i}
              bottomDivider={moreOptionsLength === i + 1 ? false : true}
              containerStyle={{
                borderColor: colors.black700,
                marginHorizontal: 10,
                backgroundColor: 'transparent',
              }}
              onPress={() => menuActions(s.name)}>
              <SimpleLineIcons name={s.icon} size={22} color={colors.red300} />
              <ListItem.Content>
                <ListItem.Title>
                  <Text style={{color: colors.red300}}>{s.name}</Text>
                </ListItem.Title>
              </ListItem.Content>
              {s.chevron && <ListItem.Chevron color={colors.red300} />}
            </ListItem>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;

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
