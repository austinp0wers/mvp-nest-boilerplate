import { TokenPayloadDto } from './tokenPayload.dto';
export class LoginResponseDto {
  accessToken: TokenPayloadDto;
  success: boolean;
  code: number;
  constructor(
    status: { success: boolean; code: number },
    accessToken: TokenPayloadDto,
  ) {
    this.accessToken = accessToken;
    this.success = status.success;
    this.code = status.code;
  }
}
