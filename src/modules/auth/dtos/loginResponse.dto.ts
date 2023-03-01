export class LoginResponseDto {
  accessToken: string;
  success: boolean;
  code: number;
  refreshToken: string;
  constructor(
    status: { success: boolean; code: number },
    accessToken: string,
    refreshToken: string,
  ) {
    this.accessToken = accessToken;
    this.success = status.success;
    this.code = status.code;
    this.refreshToken = refreshToken;
  }
}
