import { AuthGuard } from '@nestjs/passport';
import {
  ExecutionContext,
  ForbiddenException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ResponseService } from 'src/response/response.service';
import { MessageService } from 'src/message/message.service';
import { ErrorMessageInterface } from 'src/response/response.interface';
import { Reflector } from '@nestjs/core';
import { User } from '../interface/user.interface';
import { TokenExpiredError } from 'jsonwebtoken';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  constructor(
    private readonly responseService: ResponseService,
    private readonly messageService: MessageService,
    private reflector: Reflector,
  ) {
    super();
  }

  private user_types: string[];
  private permission: string[];

  canActivate(context: ExecutionContext) {
    this.user_types = this.reflector.get<string[]>(
      'user_types',
      context.getHandler(),
    );
    this.permission = this.reflector.get<string[]>(
      'permission',
      context.getHandler(),
    );
    return super.canActivate(context);
  }

  handleRequest(err: Error, user: any, info: Error) {
    const logger = new Logger();
    if (err) {
      throw new InternalServerErrorException(err);
    }
    const loggedInUser: User = user;

    if (!loggedInUser) {
      let error_message = this.messageService.get('auth.token.invalid_token');
      if (info instanceof TokenExpiredError) {
        error_message = this.messageService.get('auth.token.expired_token');
      }

      logger.error('AuthJwtGuardError.Unauthorize');
      const error: ErrorMessageInterface = {
        field: 'token',
        message: error_message,
      };
      throw new UnauthorizedException(
        this.responseService.error(
          HttpStatus.UNAUTHORIZED,
          [error],
          'Unauthorize',
        ),
      );
    }
    if (this.user_types && !this.user_types.includes(user.user_type)) {
      logger.error('AuthJwtGuardError.Forbidden');
      const error: ErrorMessageInterface = {
        field: 'token',
        message: this.messageService.get('auth.token.forbidden'),
      };
      throw new ForbiddenException(
        this.responseService.error(
          HttpStatus.FORBIDDEN,
          [error],
          'Forbidden Access',
        ),
      );
    }
    return user;
  }
}