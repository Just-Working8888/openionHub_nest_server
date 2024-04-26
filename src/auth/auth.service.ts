import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs'
import { User } from 'src/users/users.model';

@Injectable()
export class AuthService {
    constructor(private userService: UsersService,
        private jwtService: JwtService
    ) { }

    async login(userDto: CreateUserDto) {
        const user = await this.validateUser(userDto)
        return this.geneateToken(user)
    }

    async registration(userDto: CreateUserDto) {
        const coadidate = await this.userService.getUserByEmail(userDto.email)
        if (coadidate) {
            throw new HttpException('Пользователь с такой почтой уже сушествует', HttpStatus.BAD_REQUEST)
        }
        const hashPassword = await bcrypt.hash(userDto.password, 5)
        const user = await this.userService.createUsers({ ...userDto, password: hashPassword })
        return this.geneateToken(user)
    }
    private async geneateToken(user: User) {
        const payload = { email: user.email, id: user.id, roles: user.roles }
        return {
            token: this.jwtService.sign(payload)
        }
    }
    private async validateUser(userDto: CreateUserDto) {
        const user = await this.userService.getUserByEmail(userDto.email)
        const passwordEqual = await bcrypt.compare(userDto.password, user.password)
        if (user && passwordEqual) {
            return user
        }
        throw new UnauthorizedException({ messege: 'Не коректный email или пароль' })
    }
}
