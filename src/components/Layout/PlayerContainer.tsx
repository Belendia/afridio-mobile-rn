import React, {ReactNode, useCallback} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Header} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

import {colors} from '../../constants/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type PlayerContainerProps = {
  iconName: string;
  showRightButton: boolean;
  onRightButtonPressed?: () => void | undefined;
  children: ReactNode;
};

const PlayerContainer = ({
  iconName,
  showRightButton,
  onRightButtonPressed,
  children,
}: PlayerContainerProps) => {
  const navigation = useNavigation();

  const goBack = useCallback(() => {
    navigation.goBack();
    return true;
  }, [navigation]);

  return (
    <>
      <Header
        leftComponent={
          <TouchableOpacity onPress={goBack}>
            <Ionicons name={iconName} size={30} color="white" />
          </TouchableOpacity>
        }
        containerStyle={styles.header}
        rightComponent={
          showRightButton ? (
            <TouchableOpacity
              onPress={onRightButtonPressed && onRightButtonPressed}>
              <MaterialIcons
                name="playlist-play"
                size={30}
                color={colors.red200}
              />
            </TouchableOpacity>
          ) : (
            <></>
          )
        }
      />
      {children}
    </>
  );
};

PlayerContainer.defaultProps = {
  showRightButton: false,
};

export {PlayerContainer};

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.black800,
    justifyContent: 'space-around',
    borderBottomWidth: 0,
  },
});
