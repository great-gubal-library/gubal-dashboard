
import { LocationsScreen } from '../screens/Locations/LocationsScreen';
import { AddLocationScreen } from '../screens/Locations/AddLocationScreen';
import { EditLocationScreen } from '../screens/Locations/EditLocationScreen';
import { CharactersScreen } from '../screens/Characters/CharactersScreen';
import { AddCharacterScreen } from '../screens/Characters/AddCharacterScreen';
import { EditCharacterScreen } from '../screens/Characters/EditCharacterScreen';
import { HomeScreen } from '../screens/Home/HomeScreen';
import { IRoute } from '../types/Navigation';
import { default as HomeIcon } from '@material-ui/icons/Home';
import { default as AddLocationIcon } from '@material-ui/icons/AddLocation';
import { default as ExploreIcon } from '@material-ui/icons/Explore';
import { default as PersonIcon } from '@material-ui/icons/Person';
import { default as PeopleIcon } from '@material-ui/icons/People';
import { default as EditIcon } from '@material-ui/icons/Edit';

const home: IRoute = {
  name: 'Home',
  href: '/',
  iconComponent: HomeIcon,
  component: HomeScreen,
  description: ""
}

const locations: IRoute[] = [{
  name: 'Locations',
  href: '/locations',
  iconComponent: ExploreIcon,
  component: LocationsScreen,
  description: "Manage all added locations here"
}, {
  name: 'Add location',
  href: '/locations/add',
  component: AddLocationScreen,
  iconComponent: AddLocationIcon,
  description: "Add a new location",
}, {
  name: 'Location info',
  href: '/locations/:id',
  component: EditLocationScreen,
  iconComponent: EditIcon,
  description: "Location information",
}]

const characters: IRoute[] = [{
  name: 'Characters',
  href: '/characters',
  iconComponent: PersonIcon,
  component: CharactersScreen,
  description: "Manage all added characters here"
}, {
  name: 'Add Character',
  href: '/characters/add',
  component: AddCharacterScreen,
  iconComponent: AddLocationIcon,
  description: "Add a new character",
}, {
  name: 'Character info',
  href: '/characters/:id',
  component: EditCharacterScreen,
  iconComponent: EditIcon,
  description: "Character information",
}]

const freeCompanies: IRoute[] = [{
  name: 'Free Companies',
  href: '/freeCompanies',
  iconComponent: PeopleIcon,
  component: LocationsScreen,
  description: "Manage all added Free Companies here",
  disabled: true
}]

export const ROUTES: IRoute[] = [
  home,
  ...locations,
  ...characters,
  ...freeCompanies
];
