import React, {useState} from 'react';
import {StyleSheet, TouchableWithoutFeedback} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Chip} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import TrackPlayer from 'react-native-track-player';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {View} from '../Themed';
import {colors} from '../../constants/Colors';
import {CheckboxList, CheckboxOption} from '../Form/CheckboxList';
import {SpeedOptions} from '../../constants/Options';
import {RootStoreType} from '../../redux/rootReducer';
import {setPlaybackSpeed} from '../../redux/slices';

type SupportPlaybackControlProps = {
  loop: boolean;
  onLoopPressed: () => void;
};

const SupportPlaybackControl = ({
  loop,
  onLoopPressed,
}: SupportPlaybackControlProps) => {
  const dispatch = useDispatch();

  const {playbackSpeed} = useSelector((state: RootStoreType) => ({
    playbackSpeed: state.playlistReducer.playbackSpeed,
  }));

  const [showModal, setShowModal] = useState(false);

  const onSelect = (option: CheckboxOption) => {
    dispatch(setPlaybackSpeed(option));
    TrackPlayer.setRate(option.key);
    setShowModal(false);
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={onLoopPressed}>
        <Ionicons
          name="repeat"
          size={30}
          color={loop ? colors.red800 : colors.black300}
        />
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => setShowModal(true)}>
        <View style={styles.speedContainer}>
          <Chip
            title={'Speed ' + playbackSpeed.title}
            type="outline"
            titleStyle={{fontSize: 12}}
            buttonStyle={{padding: 5}}
            disabled
          />
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => setShowModal(true)}>
        <MaterialIcons name="playlist-play" size={30} color={colors.red200} />
      </TouchableWithoutFeedback>
      <CheckboxList
        options={SpeedOptions}
        value={playbackSpeed}
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
  speedContainer: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  speedIcon: {
    marginLeft: 5,
  },
});
