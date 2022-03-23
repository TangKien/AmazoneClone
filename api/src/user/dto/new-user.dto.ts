import { IsNotEmpty, IsString } from "class-validator";

export class NewUserDto {
    @IsString()
    @IsNotEmpty()
    name : string;

    @IsString()
    @IsNotEmpty()
    email : string;

    @IsString()
    @IsNotEmpty()
    password: string;
}