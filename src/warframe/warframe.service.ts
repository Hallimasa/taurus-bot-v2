import { HttpService } from '@nestjs/axios';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom, map, throwError } from 'rxjs';
import { WarframeMod } from 'src/interfaces/warframe-mod.interface';
import { Warframe } from 'src/interfaces/warframe.interface';

@Injectable()
export class WarframeService {
  constructor(private readonly axios: HttpService) {}

  fetchMod(modName: string) {
    return firstValueFrom(
      this.axios.get<WarframeMod>(`mods/${modName}`).pipe(
        map((res) => res.data),
        catchError((error: AxiosError) =>
          throwError(() => {
            if (error.response.status >= 500) {
              return new InternalServerErrorException(
                'Nossa API está fora do ar. Tenta novamente mais tardw!'
              );
            }

            if (error.response.status === 404) {
              return new NotFoundException(
                'Esse mod não existe em nossa base de dados.'
              );
            }
          })
        )
      )
    );
  }

  fetchWaframe(warframe: string) {
    return firstValueFrom(
      this.axios.get<Warframe>(`warframes/${warframe}`).pipe(
        map((res) => res.data),
        catchError((error: AxiosError) =>
          throwError(() => {
            if (error.response.status >= 500) {
              return new InternalServerErrorException(
                'Nossa API está fora do ar. Tenta novamente mais tardw!'
              );
            }

            if (error.response.status === 404) {
              return new NotFoundException(
                'Esse Warframe não existe em nossa base de dados.'
              );
            }
          })
        )
      )
    );
  }
}
