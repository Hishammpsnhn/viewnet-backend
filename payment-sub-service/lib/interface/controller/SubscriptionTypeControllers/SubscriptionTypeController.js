import CreateNewSubPlan from "../../../use-cases/SubscriptionType/CreateNewSubPlan.js";
import GetPlans from "../../../use-cases/SubscriptionType/GetPlans.js";
import EditPlans from "../../../use-cases/SubscriptionType/EditPlans.js";
import SubscriptionPlanRepository from "../../../infrastructure/repository/subscriptionPlan/subscriptionPlanRepository.js";

// Instantiate the repository
const subscriptionPlanRepository = new SubscriptionPlanRepository();

export async function GetAllPlans(req, res) {
  try {
    const plans = await GetPlans({ subscriptionPlanRepository });
    res.status(200).json({ message: true, plans });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}
export async function CreateSubscriptionPlan(req, res) {
  const {
    name,
    description,
    price,
    sessionLimit,
    duration,
    features,
    isActive,
  } = req.body;

  console.log(
    name,
    description,
    price,
    sessionLimit,
    features,
    isActive,
    subscriptionPlanRepository
  );

  try {
    // Pass the parameters to the use case
    const userProfile = await CreateNewSubPlan(
      name,
      description,
      price,
      sessionLimit,
      duration,
      features,
      isActive,
      {
        subscriptionPlanRepository,
      }
    );

    // Send the response
    res.status(200).json(userProfile);
  } catch (err) {
    // Handle errors
    console.error(err); // Log the error for debugging
    res.status(err.statusCode || 500).json({ message: err.message });
  }
}

export async function EditPlan(req,res){
  const id = "6786b4c62e7937bf6d1888e7";
  console.log(id,req.body)
  try {
    const plan = await EditPlans(id,req.body,{subscriptionPlanRepository })
  res.status(200).json(plan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
  
}
