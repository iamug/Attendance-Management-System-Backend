interface IActivityService {
  getUserActivities(id: string): Promise<object>;
  filterUserActivites(id: string, start: Date, end: Date): Promise<object>;
}

export default IActivityService;
