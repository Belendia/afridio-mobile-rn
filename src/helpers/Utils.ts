import {Image, Media} from '../../types';
import {Track} from 'react-native-track-player';

export const getPoster = (images: Image[]) => {
  const poster = images?.filter(img => img.width === 500);
  if (poster && poster.length > 0 && poster[0].image) {
    return {uri: poster[0].image};
  }
  return require('../../assets/images/backdrop.png');
};

// export const getTrack = (track: Track[] | undefined, index: number) => {
//   if (track && track.length && index > -1 && track[index].file_url) {
//     return {uri: track[index].file_url};
//   }
//   return require('../../assets/audio/no-track.mp3');
// };

export const getCover = (images: Image[], urlObject: boolean = true) => {
  const cover = images?.filter(img => img.width === 300);

  if (cover && cover.length > 0 && cover[0].image) {
    if (urlObject) return {uri: cover[0].image};
    else return cover[0].image;
  }
  return require('../../assets/images/no-cover.png');
};

export const getTrack = (media: Media, currentTrackIndex: number) => {
  const formatedTrack: Track = {
    id: 'no_audio',
    url: require('../../assets/audio/no-track.mp3'),
    title: 'No audio file found',
    artist: 'Afridio',
    artwork: require('../../assets/images/no-cover.png'),
    duration: 3,
    mediaSlug: '',
  };
  if (Array.isArray(media.tracks) && media.tracks.length > currentTrackIndex) {
    const track = media.tracks[currentTrackIndex];

    if (track && track.file_url) {
      formatedTrack.url = track.file_url;
    }
    formatedTrack.id = track.slug; // track.slug;
    formatedTrack.title = media.title + ' - ' + track.name;
    formatedTrack.artist = media.authors
      ? media.authors.map(a => a.name).join(', ')
      : '';
    formatedTrack.artwork = getCover(media.images, false);
    formatedTrack.duration = track.duration;
    formatedTrack.mediaSlug = media.slug;
  }
  return formatedTrack;
};

export const getQueryParam = (url: String, param: string) => {
  var result = url.match(new RegExp('(\\?|&)' + param + '(\\[\\])?=([^&]*)'));

  return result ? result[3] : false;
};

export const secToTime = (secs: number) => {
  if (secs < 0) {
    return '0:00';
  }
  let minutes = Math.floor(secs / 60);
  let seconds = Math.floor(secs % 60);
  return seconds <= 9 ? `${minutes}:0${seconds}` : `${minutes}:${seconds}`;
};
