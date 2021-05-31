interface IClockInService {
  getLocation(
    user_id: string,
    location: { long: string; lat: string }
  ): Promise<boolean>;
  homePageClockin(
    email: string,
    location: { long: string; lat: string }
  ): Promise<string>;
}
export default IClockInService;
