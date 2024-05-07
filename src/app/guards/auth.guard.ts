import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UsersService } from '../services/users.service';

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UsersService);
  const router = inject(Router);
  if(userService.isAuth())
  {
    return true;
  }
  else{
     router.navigateByUrl('/login');
     return false;
  }
  

};
