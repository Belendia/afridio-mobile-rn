import {Track} from 'react-native-track-player';
import RNFS from 'react-native-fs';

import {DownloadStatus, Image, Media} from '../../types';
import {
  addToLibrary,
  markTrackAsDownloaded,
  setMediaSlugDownloading,
  setMediaDownloadProgress,
  setTrackSlugDownloading,
  startToSendTrackLogDownload,
} from '../redux/slices';
import {store} from '../redux/store';
import {MediaDownloadProgress} from '../components/Media/MediaDownloadProgress';

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

export const downloadTracks = (media: Media) => {
  store.dispatch(addToLibrary(media));
  store.dispatch(setMediaSlugDownloading(media.slug));

  if (media && media.tracks && media.tracks.length! > 0) {
    for (let i = 0, p = Promise.resolve(); i < media.tracks.length!; i++) {
      p = p.then(
        _ =>
          new Promise(resolve => {
            const track = media.tracks[i];
            if (track) {
              i === 0 && store.dispatch(setMediaDownloadProgress(0));
              store.dispatch(setTrackSlugDownloading(track?.slug));

              const toFile = `${RNFS.DocumentDirectoryPath}/${track.file_url
                .split('/')
                .pop()}`;

              RNFS.downloadFile({
                fromUrl: track.file_url,
                toFile: toFile,
                background: true,
                discretionary: true,
                progressDivider: 50,
              }).promise.then(r => {
                if (r && r.statusCode === 200 && r.bytesWritten > 0) {
                  store.dispatch(
                    markTrackAsDownloaded({
                      mediaSlug: media.slug,
                      trackSlug: track.slug,
                      trackFile: toFile,
                    }),
                  );
                  store.dispatch(
                    startToSendTrackLogDownload({
                      slug: track.slug,
                      status: DownloadStatus.DOWNLOADED,
                    }),
                  );
                  store.dispatch(
                    setMediaDownloadProgress((i + 1) / media.tracks.length!),
                  );
                }

                if (i + 1 === media.tracks.length) {
                  // We finish downloading the last track. Therefore, we should reset
                  // all currently downloading variables in the redux store
                  store.dispatch(setMediaSlugDownloading(null));
                  store.dispatch(setMediaDownloadProgress(null));
                  store.dispatch(setTrackSlugDownloading(null));
                }

                resolve();
              });
            }
          }),
      );
    }
  }
};

export const deleteTracks = async (media: Media) => {
  for (const track of media.tracks) {
    if (await RNFS.exists(track.file_url)) {
      store.dispatch(
        startToSendTrackLogDownload({
          slug: track.slug,
          status: DownloadStatus.REMOVED,
        }),
      );
      await RNFS.unlink(track.file_url);
    }
  }
};
