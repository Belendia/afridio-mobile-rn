import React from 'react';
import {StyleSheet} from 'react-native';
import {Chip} from 'react-native-elements';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

import {Text, View} from '../../components/Themed';
import {colors} from '../../constants/Colors';
import {Language as LanguageType} from '../../../types';

export type LanguageOption = {
  languages: LanguageType[];
  onLanguagePress: (name: string) => void;
};

const Languages = ({languages, onLanguagePress}: LanguageOption) => {
  return (
    <>
      <Text style={styles.title}>Languages</Text>
      <View style={styles.chipContainer}>
        {languages.map((lang, index) => (
          <View style={{backgroundColor: 'transparent', margin: 2}} key={index}>
            <TouchableWithoutFeedback
              onPress={() => onLanguagePress(lang.slug)}>
              <Chip
                title={lang.name}
                type="outline"
                titleStyle={{fontSize: 14}}
                buttonStyle={{padding: 5}}
                disabled
                icon={{
                  name: 'language',
                  type: 'font-awesome',
                  size: 20,
                  color: 'white',
                }}
              />
            </TouchableWithoutFeedback>
          </View>
        ))}
      </View>
    </>
  );
};

export {Languages};

const styles = StyleSheet.create({
  title: {
    color: colors.red300,
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: 16,
  },
  chipContainer: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    flexWrap: 'wrap',
    paddingVertical: 3,
    marginTop: 5,
  },
});
