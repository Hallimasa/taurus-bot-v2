import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WarframeService {
  constructor(private readonly axios: HttpService) {}
}
