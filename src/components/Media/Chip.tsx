import React from 'react';
import {StyleSheet, ViewStyle} from 'react-native';
import {Chip as ChipCom} from 'react-native-elements';

import {View} from '../Themed';

type ChipProps = {
  values?: string[] | undefined;
  style?: ViewStyle | undefined;
};

const Chip = ({values, style}: ChipProps) => {
  return values ? (
    <View style={[styles.container, style]}>
      {values.map((item, index) => (
        <View style={{backgroundColor: 'transparent', margin: 2}} key={index}>
          <ChipCom
            title={item}
            type="outline"
            titleStyle={{fontSize: 12}}
            buttonStyle={{padding: 5}}
            disabled
          />
        </View>
      ))}
    </View>
  ) : (
    <></>
  );
};

export {Chip};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    flexWrap: 'wrap',
    paddingVertical: 3,
  },
  item: {
    fontSize: 11,
    marginRight: 5,
  },
});
