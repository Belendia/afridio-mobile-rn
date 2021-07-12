import AsyncStorage from '@react-native-async-storage/async-storage';

class AfridioAsyncStoreService {
  TOKEN_KEY = "TOKEN_KEY";
  // TRACK_DATA_KEY = 'TRACK_DATA_KEY';
  // USER_DATA_KEY = 'USER_DATA_KEY';

  async putToken(token: string) {
    try {
      await AsyncStorage.setItem(this.TOKEN_KEY, token);
    } catch (e) {
      console.warn(`StorageClient: Failed to put the token`);
      console.warn(e);
      return null;
    }
  }

  async getToken() {
    try {
      return await AsyncStorage.getItem(this.TOKEN_KEY);
    } catch (e) {
      console.warn(`StorageClient: Failed to get the token`);
      console.warn(e);
      return null;
    }
  }

  async removeToken() {
    try {
      return await AsyncStorage.removeItem(this.TOKEN_KEY);
    } catch (e) {
      console.warn(`StorageClient: Failed to remove the token`);
      console.warn(e);
    }
  }

  // async putTrackData(data) {
  //   try {
  //     await AsyncStorage.setItem(this.TRACK_DATA_KEY, data);
  //   } catch (e) {
  //     console.warn('StorageClient: Failed to put track data');
  //     console.warn(e);
  //   }
  // }

  // async getTrackData() {
  //   try {
  //     return await AsyncStorage.getItem(this.TRACK_DATA_KEY);
  //   } catch (e) {
  //     console.warn('StorageClient: Failed to get track data');
  //     console.warn(e);
  //   }
  // }

  // async putUserData(data) {
  //   try {
  //     await AsyncStorage.setItem(this.USER_DATA_KEY, data);
  //   } catch (e) {
  //     console.warn('StorageClient: Failed to put user data');
  //     console.warn(e);
  //   }
  // }

  // async getUserData() {
  //   try {
  //     return await AsyncStorage.getItem(this.USER_DATA_KEY);
  //   } catch (e) {
  //     console.warn('StorageClient: Failed to get user data');
  //     console.warn(e);
  //   }
  // }
}

export default new AfridioAsyncStoreService();
