export type RootStackParamList = {
  Root: undefined;
  MediaScreen: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  Search: undefined;
  Library: undefined;
  Settings: undefined;
};

export type HomeParamList = {
  HomeScreen: undefined;
  MediaListScreen: undefined;
};

export type SearchParamList = {
  SearchScreen: undefined;
};

export type AuthParamList = {
  SignInScreen: undefined;
  SignUpScreen: undefined;
  VerifyScreen: undefined;
};

export type SettingsParamList = {
  SettingsScreen: undefined;
};

export type User = {
  name: string;
  phone_number: string;
  sex: string;
  date_of_birth: string;
  picture: string;
  password: string;
  session_token: string;
};

export type Track = {
  slug: string;
  name: string;
  file_url: string;
  duration: number;
  sequence: number;
};

export type Image = {
  slug: string;
  width: number;
  image: string;
};

export type Photo = {
  slug: string;
  file: string;
};

export type Author = {
  name: string;
  slug: string;
  photo: Photo[];
};

export type Media = {
  title: string;
  price: number;
  discount_price: number | null;
  description: string;
  slug: string;
  estimated_length_in_seconds: number;
  rating: number | null;
  release_date: string;
  language: string;
  media_format: string;
  word_count: number;
  featured: boolean;
  album_type: string | null;
  genres: string[];
  tracks: Track[];
  authors: Author[];
  narrators: string[];
  images: Image[];
};
