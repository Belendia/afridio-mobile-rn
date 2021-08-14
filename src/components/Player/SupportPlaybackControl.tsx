import React, {useCallback, useState} from 'react';
import {StyleSheet, TouchableWithoutFeedback} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Chip} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import TrackPlayer from 'react-native-track-player';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

import {View} from '../Themed';
import {colors} from '../../constants/Colors';
import {CheckboxList, CheckboxOption} from '../Form/CheckboxList';
import {SpeedOptions} from '../../constants/Options';
import {RootStoreType} from '../../redux/rootReducer';
import {
  setMediaSlug,
  setPlaybackSpeed,
  setShowMiniPlayer,
} from '../../redux/slices';
import {modalRef} from '../../services/navigation/ModalizeService';

type SupportPlaybackControlProps = {
  loop: boolean;
  onLoopPressed: () => void;
};

const SupportPlaybackControl = ({
  loop,
  onLoopPressed,
}: SupportPlaybackControlProps) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {playbackSpeed, playlistMedia} = useSelector(
    (state: RootStoreType) => ({
      playbackSpeed: state.playlistReducer.playbackSpeed,
      playlistMedia: state.playlistReducer.playlistMedia,
    }),
  );

  const [showModal, setShowModal] = useState(false);

  const onSelect = (option: CheckboxOption) => {
    dispatch(setPlaybackSpeed(option));
    TrackPlayer.setRate(option.key);
    setShowModal(false);
  };

  const onPlaylistPressed = useCallback(() => {
    dispatch(setMediaSlug(playlistMedia?.slug));
    modalRef.current?.close();

    navigation.navigate('Media', {
      slug: playlistMedia?.slug,
    });
    dispatch(setShowMiniPlayer(false));
  }, [playlistMedia?.slug]);

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
      <TouchableWithoutFeedback onPress={() => onPlaylistPressed()}>
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
