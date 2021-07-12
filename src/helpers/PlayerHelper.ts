// import { Media } from "./../../types";
// import { Audio, AVPlaybackStatus } from "expo-av";
// import { getTrack } from "./Utils";

// export default class Player {
//   private static sound: Audio.Sound | null;
//   private static media: Media;
//   private static trackIndex: number;

//   private constructor() {}

//   public static get Instance() {
//     return Player.sound;
//   }

//   public static async load(
//     media: Media,
//     trackIndex: number,
//     isMuted: boolean,
//     onPlaybackStatusUpdate: (status: AVPlaybackStatus) => void
//   ) {
//     if (
//       !media ||
//       !media.tracks ||
//       media.tracks.length === 0 ||
//       trackIndex >= media.tracks.length
//     ) {
//       return;
//     }

//     if (Player.sound) {
//       console.log("sound is not null");
//       if (
//         Player.media.slug === media.slug &&
//         Player.trackIndex === trackIndex
//       ) {
//         console.log(
//           "media and track are the same as the previous toggling the player"
//         );
//         await Player.togglePlay();
//         return;
//       } else {
//         console.log("sound is null unloading");
//         await Player.sound.unloadAsync();
//       }
//     }

//     Player.media = media;
//     Player.trackIndex = trackIndex;

//     console.log("creating new audio object");
//     const { sound: newSound } = await Audio.Sound.createAsync(
//       getTrack(media.tracks, trackIndex),
//       {
//         shouldPlay: true,
//         shouldCorrectPitch: true,
//         isMuted: isMuted,
//       },
//       onPlaybackStatusUpdate
//     );
//     Player.sound = newSound;
//   }

//   public static async togglePlay() {
//     if (!Player.sound) {
//       return;
//     }
//     console.log(await Player.isPlaying());
//     if (await Player.isPlaying()) {
//       console.log("pausing");
//       await Player.pauseAudio();
//     } else {
//       console.log("playing");
//       await Player.playAudio();
//     }
//   }

//   public static async pauseAudio() {
//     if (!Player.sound) {
//       return;
//     }
//     console.log("-------Pause");
//     await Player.sound.pauseAsync();
//   }

//   public static async playAudio() {
//     if (!Player.sound) {
//       return;
//     }
//     console.log("-------Play");
//     await Player.sound.playAsync();
//   }

//   public static async isPlaying() {
//     if (!Player.sound) {
//       return false;
//     }

//     return (await Player.sound.getStatusAsync()).isPlaying;
//   }

//   public static async unload() {
//     if (!Player.sound) {
//       return;
//     }

//     await Player.sound.unloadAsync();
//     Player.sound = null;
//   }

//   // Change sound speed 1x, 2x
//   public static async setRate(rate: number) {
//     if (!Player.sound) {
//       return;
//     }

//     await Player.sound.setRateAsync(rate, false);
//   }

// }
