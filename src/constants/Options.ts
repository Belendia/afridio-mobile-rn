import {CheckboxOption, SexOption} from '../components';

export const SexOptions: SexOption[] = [
  {key: 'MALE', value: 'Male'},
  {key: 'FEMALE', value: 'Female'},
];

export const SpeedOptions: CheckboxOption[] = [
  {key: 0.75, title: '0.75x'},
  {key: 1, title: '1.00x'},
  {key: 1.25, title: '1.25x'},
  {key: 1.5, title: '1.50x'},
  {key: 1.75, title: '1.75x'},
  {key: 2, title: '2.00x'},
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
