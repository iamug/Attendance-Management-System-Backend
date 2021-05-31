interface IClockOutService {
  dashboardClockOut(
    user_id: string,
    location: { long: string; lat: string }
  ): Promise<Boolean>;
  homePageClockOut(
    email: string,
    location: { long: string; lat: string }
  ): Promise<String>;
}
export default IClockOutService;
