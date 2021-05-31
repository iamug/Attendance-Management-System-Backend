import ClockOut from "App/Model/ClockOut_model";
import NOSQLPD_Repository from "Elucidate/Repository/NOSQLPD_repository";

class ClockOutRepository extends NOSQLPD_Repository {
  constructor() {
    super(ClockOut);
  }
}

export default ClockOutRepository;
