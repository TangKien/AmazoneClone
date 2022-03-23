import {IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class createProductDto {
    @IsNotEmpty()
    name : string

    @IsNotEmpty()
    @IsNumber()
    price : number

    @IsString()
    @IsOptional()
    description : string
}

export class updateProductDto {
    @IsOptional()
    name : string
    description: string

    @IsOptional()
    @IsNumber()
    price: number
}