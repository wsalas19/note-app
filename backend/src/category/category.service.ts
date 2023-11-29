import { Injectable } from "@nestjs/common";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { Repository } from "typeorm";
import { Category } from "./entities/category.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class CategoryService {
	constructor(@InjectRepository(Category) private categoryRepository: Repository<Category>) {}
	create(createCategoryDto: CreateCategoryDto) {
		const newCategory = this.categoryRepository.create({
			...createCategoryDto,
			createdAt: new Date(),
		});
		return this.categoryRepository.save(newCategory);
	}

	findAll() {
		return this.categoryRepository.find();
	}

	findOne(id: number) {
		const categorySearch = this.categoryRepository.findOne({ where: { id: id } });
		return categorySearch;
	}

	update(id: number, updateCategoryDto: UpdateCategoryDto) {
		return this.categoryRepository.update(id, { ...updateCategoryDto });
	}

	remove(id: number) {
		return this.categoryRepository.delete(id);
	}
}
