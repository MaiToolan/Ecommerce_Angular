import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../service/authServices";


export const authGuard :CanActivateFn =()=>{
  const router= inject(Router);
  const auth =inject(AuthService);
  if(auth.authorized()){
    return true;
  }
  else{
    return router.createUrlTree(['/login']);
   }
}
