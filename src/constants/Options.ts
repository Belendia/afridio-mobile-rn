import { Option } from "../components";

export const SexOptions: Option[] = [
  { key: "MALE", value: "Male" },
  { key: "FEMALE", value: "Female" },
];

export const SettingsMoreOptions = [
  {
    name: "Language",
    icon: "globe",
    chevron: true,
  },
  {
    name: "Change password",
    icon: "lock",
    chevron: true,
  },
  {
    name: "Sign out",
    icon: "logout",
    chevron: false,
  },
];

export enum Size {
  Large,
  Medium,
  Small,
}
