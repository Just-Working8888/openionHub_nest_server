import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
@Injectable()
export class JwtAuthCuard implements CanActivate {

    constructor(private jwtSevice: JwtService) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest()
        try {
            const authHeader = req.headers.authorization;
            const bearer = authHeader.split(" ")[0];
            const token = authHeader.split(" ")[1]
            if (bearer !== 'Bearer' || !token) {
                throw new UnauthorizedException({ messege: 'Пользователь не авторизован' })
            }
            const user = this.jwtSevice.verify(token)
            req.user = user
            return true
        } catch (error) {
            throw new UnauthorizedException({ messege: 'Пользователь не авторизован' })
        }
    }
}