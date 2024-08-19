import { INavData } from '@coreui/angular';
import { AuthService } from 'src/app/services/auth.service';

export interface INavDataProps extends INavData {
  needValidation?: boolean;
}

export const navItems: INavDataProps[] = [
  {
    name: 'Home',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    needValidation: false,
  },
  {
    name: 'Productos',
    url: '/shop-products',
    iconComponent: { name: 'cil3d' },
    needValidation: false,
  },
  {
    name: 'Ordenes',
    url: '/orders',
    iconComponent: { name: 'cil-dollar' },
    needValidation: false,
  },
  {
    title: true,
    name: 'Administración'
  },
  {
    name: 'Cuenta',
    url: '/profile',
    iconComponent: { name: 'cil-people' },
    needValidation: false,
  },
  {
    name: 'Inventario',
    url: '/products-admin',
    iconComponent: { name: 'cil-clipboard' },
    needValidation: true,
  }
];

export function getNavItems(authService: AuthService): INavDataProps[] {
  return navItems.filter(item => userValidation(authService, item));
}

function userValidation(authService: AuthService, prop: INavDataProps): boolean {
  if (!prop.needValidation) return true;
  const user = authService.getLoggedUser();
  return user.is_superuser;
}
