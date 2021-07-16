import {CheckboxOption, SexOption} from '../components';

export const SexOptions: SexOption[] = [
  {key: 'MALE', value: 'Male'},
  {key: 'FEMALE', value: 'Female'},
];

export const SpeedOptions: CheckboxOption[] = [
  {key: 0.5, title: '0.5x'},
  {key: 1, title: '1.0x'},
  {key: 2, title: '2.0x'},
  {key: 3, title: '3.0x'},
];

export const SettingsMoreOptions = [
  {
    name: 'Language',
    icon: 'globe',
    chevron: true,
  },
  {
    name: 'Change password',
    icon: 'lock',
    chevron: true,
  },
  {
    name: 'Sign out',
    icon: 'logout',
    chevron: false,
  },
];

export enum Size {
  Large,
  Medium,
  Small,
}
