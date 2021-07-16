import React, {useCallback, useState, useEffect} from 'react';
import Slider from '@react-native-community/slider';
import {useTrackPlayerProgress} from 'react-native-track-player';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import TrackPlayer from 'react-native-track-player';
import layout from '../../constants/Layout';
import {Text, View} from '../../components/Themed';
import {ViewStyle} from 'react-native';
import {colors} from '../../constants/Colors';
import {secToTime} from '../../helpers/Utils';

const SCREEN_WIDTH = layout.window.width;
const SLIDER_WIDTH = SCREEN_WIDTH * 0.82;

type ProgressSliderProps = {
  style?: ViewStyle | undefined;
};

const ProgressSlider = ({style}: ProgressSliderProps) => {
  const [thumbIconSize, setThumbIconSize] = useState();
  const {position, duration} = useTrackPlayerProgress();

  const getProgress = useCallback(() => {
    if (duration === 0) return 0;
    else return position / duration;
  }, [position, duration]);

  const timePassed = useCallback(() => secToTime(position), [position]);
  const secToTimeDuration = useCallback(() => {
    return secToTime(duration);
  }, [duration]);

  const seekTo = useCallback(
    (value: number) => {
      let seekPosition = value * duration;
      TrackPlayer.seekTo(seekPosition);
    },
    [duration],
  );

  useEffect(() => {
    MaterialIcons.getImageSource('circle', 18, colors.white).then(source =>
      setThumbIconSize(source),
    );
  }, []);

  return (
    <View
      style={[
        {
          flexDirection: 'column',
          alignItems: 'center',
        },
        style && style,
      ]}>
      <Slider
        value={getProgress()}
        style={{width: SLIDER_WIDTH}}
        minimumValue={0}
        maximumValue={1}
        minimumTrackTintColor={colors.red800}
        maximumTrackTintColor={colors.black700}
        onValueChange={seekTo}
        thumbImage={thumbIconSize}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: SLIDER_WIDTH,
          marginTop: -10,
          backgroundColor: 'transparent',
        }}>
        <Text>{timePassed()}</Text>
        <Text>{secToTimeDuration()}</Text>
      </View>
    </View>
  );
};

export {ProgressSlider};
