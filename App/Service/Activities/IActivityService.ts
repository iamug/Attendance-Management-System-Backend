interface IActivityService {
  getUserActivities(id: string): Promise<object>;
}

export default IActivityService;
