import React from 'react';
import {StyleSheet} from 'react-native';
import {Chip} from 'react-native-elements';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

import {colors} from '../../constants/Colors';
import {Text, View} from '../Themed';
import {Format as FormatType} from '../../../types';

export type FormatOption = {
  formats: FormatType[];
  onFormatPress: (name: string) => void;
};

const Formats = ({formats, onFormatPress}: FormatOption) => {
  return (
    <>
      <Text style={styles.title}>Formats</Text>
      <View style={styles.chipContainer}>
        {formats.map((format, index) => (
          <View style={{backgroundColor: 'transparent', margin: 2}} key={index}>
            <TouchableWithoutFeedback
              onPress={() => onFormatPress(format.slug)}>
              <Chip
                title={format.name}
                type="outline"
                titleStyle={{fontSize: 14}}
                buttonStyle={{padding: 5}}
                disabled
                icon={{
                  name: 'newspaper-o',
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

export {Formats};

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
