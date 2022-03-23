import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.interface';
import { createProductDto, updateProductDto } from './productDto';
import { JwtGuard } from 'src/guards/jwt.guard';
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  //GET ALL PRODUCT
  @Get()
  findAllProducts(): Promise<Product[]> {
    return this.productService.findAll();
  }

  //GET ONE PRODUCT
  @UseGuards(JwtGuard)
  @Get(':id')
  findProduct(@Param('id') id: string): Promise<Product> {
    return this.productService.find(id);
  }

  //CREATE NEW PRODUCT
  @Post()
  createPost(@Body() createProductDto: createProductDto): Promise<Product> {
    return this.productService.create(createProductDto);
  }

  //UPDATE PRODUCT
  @Patch(':id')
  updatePost(
    @Param('id') id: string,
    @Body() updateProductDto: updateProductDto,
  ): Promise<Product> {
    return this.productService.update(id, updateProductDto);
  }

  //DELETE PRODUCT
  @Delete(':id')
  deletePost(@Param('id') id: string) {
    return this.productService.delete(id);
  }
}
