interface IClockInService {
  getLocation(
    user_id: string,
    location: { long: string; lat: string }
  ): Promise<boolean>;
  homePageClockin(
    email: string,
    location: { long: string; lat: string }
  ): Promise<string>;
  checkClockIn(user: string): Promise<Boolean>;
}
export default IClockInService;
