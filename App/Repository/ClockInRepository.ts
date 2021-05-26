import ClockInOut from "App/Model/ClockInOut_model";
import NOSQLPD_Repository from "Elucidate/Repository/NOSQLPD_repository";

class ClockInRepository extends NOSQLPD_Repository {
  constructor() {
    super(ClockInOut);
  }
}

export default ClockInRepository;
