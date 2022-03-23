import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './product.interface';
import { Model } from 'mongoose';
import { createProductDto } from './productDto';
@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  //CREATE NEW PRODUCT
  async create(createProductDto: createProductDto): Promise<Product> {
    const newProduct = new this.productModel(createProductDto);
    return await newProduct.save();
  }

  //GET ALL PRODUCT
  async findAll(): Promise<Product[]> {
    return await this.productModel.find().exec();
  }

  //GET ONE PRODUCT
  async find(id: string): Promise<Product> {
    try {
      const foundedProduct = await this.productModel.findById(id).exec();
      if (!foundedProduct) {
        throw new NotFoundException('Product not found');
      }
      return foundedProduct;
    } catch (error) {
      throw new NotFoundException('Proudct not found');
    }
  }

  //UPDATE PRODUCT
  async update(
    id: string,
    updateProductDto
  ): Promise<Product> {
    try {
      let existingProduct = await this.productModel.findById(id);
      if (!existingProduct) {
        throw new NotFoundException('Product not found');
      }
      existingProduct.name = updateProductDto.name ?? existingProduct.name;
      existingProduct.price = updateProductDto.price ?? existingProduct.price;
      existingProduct.description =
        updateProductDto.description ?? existingProduct.description;

      return await existingProduct.save();
    } catch (error) {
      throw new NotFoundException('Product not found');
    }
  }

  //DELETE PRODUCT
  async delete(id: string) {
    return await this.productModel.deleteOne({ _id: id });
  }
}
