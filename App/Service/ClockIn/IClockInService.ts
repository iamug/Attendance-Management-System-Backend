interface IClockInService {
  getLocation(
    user_id: string,
    location: { long: string; lat: string }
  ): Promise<Boolean>;
  homePageClockin(
    email: string,
    location: { long: string; lat: string }
  ): Promise<String>;
}
export default IClockInService;
