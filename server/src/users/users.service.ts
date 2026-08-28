import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { SearchUserDto } from "./dtos/search-user.dto";
import { FindOptionsWhere, ILike, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/User.entity";
import * as bcrypt from "bcrypt";
import { RegisterDto } from "src/common/dtos/register.dto";
import { LoginDto } from "src/common/dtos/login.dto";
import { CompleteProfileDto } from "./dtos/complete-profile.dto";
import { plainToInstance } from "class-transformer";
import { GetAllUsersDto } from "./dtos/get-all-users.dto";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity.js";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async getAll(query: GetAllUsersDto) {
    let where: FindOptionsWhere<User>[] | undefined = undefined;

    if (query.search) {
      const searchPattern = `%${query.search}%`;

      where = [
        { email: ILike(searchPattern) },
        { username: ILike(searchPattern) },
      ];
    }

    return this.usersRepository.find({ where });
  }

  async findOneOrFail(searchUserDto: SearchUserDto): Promise<User> {
    const foundUser = await this.findOne(searchUserDto);

    if (!foundUser) {
      throw new UnauthorizedException("User not found");
    }

    return foundUser;
  }

  async findOne(searchUserDto: SearchUserDto): Promise<User | null> {
    if (
      !searchUserDto.email &&
      !searchUserDto.username &&
      !searchUserDto.id &&
      !searchUserDto.googleId
    ) {
      throw new BadRequestException(
        "At least one search criterion must be provided.",
      );
    }

    const conditions: { [key: string]: string }[] = [];

    if (searchUserDto.id) {
      conditions.push({ id: searchUserDto.id });
    }

    if (searchUserDto.googleId) {
      conditions.push({ googleId: searchUserDto.googleId });
    }

    if (searchUserDto.email) {
      conditions.push({ email: searchUserDto.email });
    }

    if (searchUserDto.username) {
      conditions.push({ username: searchUserDto.username });
    }

    const foundUser = await this.usersRepository.findOne({
      where: conditions,
    });

    return foundUser;
  }

  createOAuthUser(data: Partial<User>): Promise<User> {
    const user = this.usersRepository.create(data);
    return this.usersRepository.save(user);
  }

  async update(id: string, data: QueryDeepPartialEntity<User>): Promise<User> {
    await this.usersRepository.update(id, data);
    return this.findOneOrFail({ id });
  }

  async create(createUserDto: RegisterDto) {
    const encryptedPassword = await this.encryptPassword(
      createUserDto.password,
    );

    const newUser: User = await this.usersRepository.save({
      ...createUserDto,
      password: encryptedPassword,
    });

    return newUser;
  }

  async validateUser(loginDto: LoginDto): Promise<User> {
    const foundUser = await this.findOneOrFail(loginDto);

    const isPasswordValid = await this.verifyPassword(
      loginDto.password,
      foundUser.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid credentials");
    }

    return foundUser;
  }

  encryptPassword(password: string) {
    return bcrypt.hash(password, 10);
  }
  verifyPassword(password: string, storedPassword: string) {
    return bcrypt.compare(password, storedPassword);
  }

  async completeProfile({
    dto,
    userId,
  }: {
    userId: string;
    dto: CompleteProfileDto;
  }) {
    const user = await this.findOneOrFail({ id: userId });

    const userToSave = plainToInstance(User, {
      ...user,
      ...dto,
      isProfileCompleted: true,
    });

    return this.usersRepository.save(userToSave);
  }
}
