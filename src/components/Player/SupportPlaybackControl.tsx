import React, {useState} from 'react';
import {StyleSheet, TouchableWithoutFeedback} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Chip} from 'react-native-elements';

import {View} from '../Themed';
import {colors} from '../../constants/Colors';
import {CheckboxList, CheckboxOption} from '../Form/CheckboxList';
import {SpeedOptions} from '../../constants/Options';

type SupportPlaybackControlProps = {
  onPlaylistPressed: () => void;
};

const SupportPlaybackControl = ({
  onPlaylistPressed,
}: SupportPlaybackControlProps) => {
  const [showModal, setShowModal] = useState(false);
  const [speed, setSpeed] = useState<CheckboxOption>({key: 1, title: '1.0x'});

  const onSelect = (option: CheckboxOption) => {
    setSpeed(option);
    setShowModal(false);
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={onPlaylistPressed}>
        <MaterialIcons name="playlist-play" size={30} color={colors.red200} />
      </TouchableWithoutFeedback>
      <Chip
        title={'Speed ' + speed.title}
        type="outline"
        titleStyle={{fontSize: 12}}
        buttonStyle={{padding: 5}}
        disabled
      />
      <TouchableWithoutFeedback onPress={() => setShowModal(true)}>
        <Ionicons name="speedometer-outline" size={25} color={colors.red200} />
      </TouchableWithoutFeedback>
      <CheckboxList
        options={SpeedOptions}
        value={speed}
        show={showModal}
        onSelect={onSelect}
        onClose={() => setShowModal(false)}
      />
    </View>
  );
};

export {SupportPlaybackControl};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    backgroundColor: 'transparent',
  },
});
