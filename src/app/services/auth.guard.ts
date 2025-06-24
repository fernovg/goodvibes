import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { authState } from '@angular/fire/auth';
import { map, take } from 'rxjs/operators';

export const AuthGuard: CanActivateFn = () => {
    const auth = inject(Auth);
    const router = inject(Router);

    return authState(auth).pipe(
        take(1),
        map(user => {
            const dataUser = localStorage.getItem('dataUser');

            if (user && dataUser) {
                return true;
            } else {
                router.navigate(['/login']);
                return false;
            }
        })
    );
};
