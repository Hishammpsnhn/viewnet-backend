import CreateNewUserSubscription from "../../../use-cases/userSubscription/CreateNewUserSubscription.js";
import UserNewPlanRepository from "../../../infrastructure/repository/userSubscription/userSubsciption.js";

const createNewPlanRepository = new UserNewPlanRepository();
export async function UserCreatePlan(req, res) {
  const { userId, startDate, plan, sessionLimit, status, endDate } = req.body;
  try {
    const userPlan = await CreateNewUserSubscription(req.body, {
      createNewPlanRepository: createNewPlanRepository,
    });
    res.status(200).json({ message: true, userPlan });
  } catch (err) {
    console.error(err);
    res.status(err.statusCode || 500).json({ message: err.message });
  }
}
