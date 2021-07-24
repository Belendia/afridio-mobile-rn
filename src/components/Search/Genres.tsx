import React from 'react';
import {StyleSheet} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

import {colors} from '../../constants/Colors';
import {Text, View} from '../Themed';
import {Genre as GenreType} from '../../../types';
import {GradientCard} from '../Cards/GradientCard';

type GenreOption = {
  genres: GenreType[];
  onGenrePress: (name: string) => void;
};

const Genres = ({genres, onGenrePress}: GenreOption) => {
  return (
    <>
      <Text style={styles.title}>Genres</Text>
      <View style={styles.container}>
        {genres.map((genre, index) => (
          <TouchableWithoutFeedback
            onPress={() => onGenrePress(genre.slug)}
            key={index}>
            <GradientCard name={genre.name} index={index} />
          </TouchableWithoutFeedback>
        ))}
      </View>
    </>
  );
};

export {Genres};

const styles = StyleSheet.create({
  title: {
    color: colors.red300,
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: 16,
  },
  container: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    flexWrap: 'wrap',
    paddingVertical: 3,
    marginTop: 5,
  },
});
