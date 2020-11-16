/*
 * @Author: liruigang
 * @Date: 2019-09-27 21:04:36
 * @LastEditors: liruigang
 * @LastEditTime: 2019-09-27 22:15:44
 * @UI: 
 */
import {Get, Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport'
import { TagEntity } from './tag.entity';
import { TagService } from './tag.service';
import { JwtAuthGuard } from '../system/auth/guards/jwt-auth.guard'
import { LocalAuthGuard } from '../system/auth/guards/local-auth.guard'
import {
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('tags')
@Controller('tags')
@UseGuards(JwtAuthGuard)
export class TagController {

  constructor(private readonly tagService: TagService) {}

  @Get()
  async findAll() {
    const taglist = await this.tagService.findAll()
    const tags = taglist.map(item => {
      return item.tag
    })
    return { tags };
  }

}