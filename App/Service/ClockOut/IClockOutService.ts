interface IClockOutService {
  dashboardClockOut(
    user_id: string,
    location: { long: string; lat: string }
  ): Promise<string>;
  homePageClockOut(
    email: string,
    location: { long: string; lat: string }
  ): Promise<string>;
  checkClockOut(user: string): Promise<Boolean>;
}
export default IClockOutService;
