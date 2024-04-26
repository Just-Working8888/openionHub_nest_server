import { Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';

@ApiTags('Пользователи ')
@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) { }

    @ApiOperation({ summary: 'create user' })
    @ApiResponse({ status: 200, type: User })
    @UsePipes(ValidationPipe)
    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.userService.createUsers(userDto)
    }


    @ApiOperation({ summary: 'Получить всех пользователей' })
    @ApiResponse({ status: 200, type: [User] })
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Get()
    getAll() {
        return this.userService.getAllUsers();
    }

    @ApiOperation({ summary: 'Добавить роль' })
    @ApiResponse({ status: 200, type: [User] })
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post('/role')
    addRoles(@Body() dto: AddRoleDto) {
        return this.userService.addRole(dto);
    }

    @ApiOperation({ summary: 'Добавить роль' })
    @ApiResponse({ status: 200, type: [User] })
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post('/ban')
    ban(@Body() dto: BanUserDto) {
        return this.userService.ban(dto);
    }
}
