interface IClockOutService {
  dashboardClockOut(
    user_id: string,
    location: { long: string; lat: string }
  ): Promise<Boolean>;
  homePageClockOut(
    email: string,
    location: { long: string; lat: string }
  ): Promise<String>;
  checkClockOut(user: string): Promise<Boolean>;
}
export default IClockOutService;
