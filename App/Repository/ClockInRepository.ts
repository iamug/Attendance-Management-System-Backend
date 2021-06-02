import ClockIn from "App/Model/ClockIn_model";
import NOSQLPD_Repository from "Elucidate/Repository/NOSQLPD_repository";

class ClockInRepository extends NOSQLPD_Repository {
  constructor() {
    super(ClockIn);
  }
}

export default ClockInRepository;
