import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('jwtToken');
        console.log(token);
        
        if (token) {
            //setHeaders: {Authorization: `Bearer ${token}`}
            req = req.clone({
                setHeaders: {
                    'Content-Type' : 'application/json; charset=utf-8',
                    'Accept'       : 'application/json',
                    'Authorization': `Bearer ${token}`,
                  },
            });
        }

        return next.handle(req);
    }
}