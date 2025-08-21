import { CanDeactivateFn } from '@angular/router';
import { Register } from '../../Pages/register/register';

export const registerGuard: CanDeactivateFn<Register> = (component, currentRoute, currentState, nextState) => {
  if(component.registrationForm.valid){
    const alert = window.confirm('Your data will be lose');
    return alert;
  }
  return true;
};
