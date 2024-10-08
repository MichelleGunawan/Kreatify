import { supabase } from "@/utils/supabase/js/client";
import { PaymentStatusType } from "@/types/campaign.type";
import { UUID } from "crypto";
const now = new Date().toISOString(); // Convert the date to ISO 8601 format

//Helper functions
const upsertDeliverable = async (deliverable: any, campaignID: UUID) => {
  const { id, note, attachments } = deliverable;
  if (id) {
    // Update existing deliverable
    const { data, error } = await supabase
      .from("deliverable")
      .update({ note, attachments })
      .eq("id", id)
      .select("*")
      .single();
    if (error) throw error;
    return data;
  } else {
    // Insert new deliverable
    const { data, error } = await supabase
      .from("deliverable")
      .insert({ note, attachments, campaign_id: campaignID })
      .select("*")
      .single();
    if (error) throw error;
    return data;
  }
};

const upsertMilestone = async (
  milestone: any,
  deliverableId: number,
  campaignID: UUID
) => {
  const { id: milestoneId, type, due_date, social_id } = milestone;

  if (milestoneId && milestoneId > 0) {
    // Update existing milestone
    const { data, error } = await supabase
      .from("milestone")
      .update({
        type,
        due_date,
        social_id: social_id === null ? null : social_id,
        deliverable_id: deliverableId,
        campaign_id: campaignID,
      })
      .eq("id", milestoneId)
      .select("*")
      .single();

    if (error) throw error;
    return data;
  } else {
    // Insert new milestone
    const { data, error } = await supabase
      .from("milestone")
      .insert({
        type,
        due_date,
        social_id: social_id === null ? null : social_id,
        deliverable_id: deliverableId,
        campaign_id: campaignID,
      })
      .select("*")
      .single();

    if (error) throw error;
    return data;
  }
};

/**
 * Function to create a new campaign and its payment details
 * @param {object} campaignData - The data for the new campaign
 * @param {object} paymentData - The data for the new campaign payment
 * @returns {Promise<number>} - The ID of the created campaign
 * @throws {Error} - If there is an error creating the campaign or payment
 **/
export const createCampaignWithPayment = async (
  campaignData: any,
  paymentData: any
) => {
  const newCampaignData = {
    status: "pending",
    created_at: new Date().toISOString(),
    ...campaignData,
  };

  const { data: campaignDataResponse, error: campaignError } = await supabase
    .from("campaign")
    .insert(newCampaignData)
    .select("id")
    .single();

  if (campaignError) {
    console.error("Error creating campaign:", campaignError);
    throw new Error("Error creating campaign");
  }

  const campaignID = campaignDataResponse?.id;

  if (!campaignID) {
    throw new Error("Failed to retrieve new campaign ID.");
  }

  const { data: paymentDataResponse, error: paymentError } = await supabase
    .from("campaign_payment")
    .insert({ ...paymentData, campaign_id: campaignID });

  if (paymentError) {
    console.error("Error creating campaign payment:", paymentError);
    throw new Error("Error creating campaign payment");
  }

  return campaignID;
};

/**
 * Function to update an existing campaign
 * @param {string} campaignID - The ID of the campaign to update
 * @returns {Promise<{ id: number }>} - The updated campaign
 * @throws {Error} - If there is an error updating the campaign
 * */
export const updateCampaign = async (campaignID: string, campaignData: any) => {
  const { data, error } = await supabase
    .from("campaign")
    .update(campaignData)
    .match({ id: campaignID });

  if (error) {
    console.error("Error updating campaign:", error);
    throw new Error("Error updating campaign");
  }

  return data;
};

/**
 * Function to update an existing campaign payment
 * @param {string} campaignID - The ID of the campaign to update
 * @returns {Promise<{ id: number }>} - The updated campaign payment
 * @throws {Error} - If there is an error updating the campaign payment
 * */
export const updateCampaignPayment = async (
  campaignID: UUID | null,
  paymentData: any
) => {
  if (!campaignID) throw new Error("Campaign ID not provided");
  const { data, error } = await supabase
    .from("campaign_payment")
    .update(paymentData)
    .match({ campaign_id: campaignID });

  if (error) {
    console.error("Error updating campaign payment:", error);
    throw new Error("Error updating campaign payment");
  }

  return data;
};

/**
 * Function to update the status of a campaign
 * @param {UUID} campaignID - The ID of the campaign to update
 * @returns {Promise<{ id: number }>} - The updated campaign
 * @throws {Error} - If there is an error updating the campaign
 * */
export const updateCampaignStatusToOngoing = async (
  campaignID: UUID | null
) => {
  if (!campaignID) throw new Error("Campaign ID not provided");
  const { data, error } = await supabase
    .from("campaign")
    .update({
      status: "ongoing",
      date_accepted_rejected: new Date().toISOString(),
    })
    .eq("id", campaignID);

  if (error) {
    console.error("Error updating campaign status:", error);
    throw new Error("Error updating campaign status");
  }

  return data;
};

/**
 * Function to update the status of a campaign
 * @param {number} campaignID - The ID of the campaign to update
 * @returns {Promise<{ id: number }>} - The updated campaign
 * @throws {Error} - If there is an error updating the campaign
 * */
export const updateCampaignStatusToRejected = async (
  campaignID: UUID | null
) => {
  if (!campaignID) throw new Error("Campaign ID not provided");
  const { data, error } = await supabase
    .from("campaign")
    .update({
      status: "rejected",
      date_accepted_rejected: new Date().toISOString(),
    })
    .eq("id", campaignID);

  if (error) {
    console.error("Error updating campaign status:", error);
    throw new Error("Error updating campaign status");
  }

  return data;
};

/**
 * Function to update the status of a campaign to completed
 * @param {number} campaignID - The ID of the campaign to update
 * @returns {Promise<{ id: number }>} - The updated campaign
 * @throws {Error} - If there is an error updating the campaign
 */
export const updateCampaignStatusToCompleted = async (
  campaignID: UUID | null
) => {
  if (!campaignID) throw new Error("Campaign ID not provided");
  const { data, error } = await supabase
    .from("campaign")
    .update({ status: "completed", date_closed: new Date().toISOString() })
    .eq("id", campaignID);

  if (error) {
    console.error("Error updating campaign status:", error);
    throw new Error("Error updating campaign status");
  }

  return data;
};

/**
 * Function to create a new deliverable
 * @param {any} deliverableData - The data for the new deliverable
 * @returns {Promise<{ id: number }>} - The created deliverable
 * @throws {Error} - If there is an error creating the deliverable
 * */
// Function to create deliverables
export const createDeliverablesWithMilestones = async (
  deliverables: any[],
  campaignID: UUID
) => {
  const deliverableInsertPromises = deliverables.map(
    async ({ note, attachments, order, milestones }) => {
      // Insert deliverable
      const { data: deliverableData, error: deliverableError } = await supabase
        .from("deliverable")
        .insert({
          campaign_id: campaignID,
          note,
          attachments,
          order,
        })
        .select("id")
        .single();

      if (deliverableError) {
        throw deliverableError;
      }

      // Insert milestones
      const milestonesInsertPromises = milestones.map(
        async (milestone: any) => {
          const { error: milestoneError } = await supabase
            .from("milestone")
            .insert({
              deliverable_id: deliverableData.id,
              campaign_id: campaignID,
              type: milestone.type,
              dueDate: milestone.dueDate,
              social_id: milestone.social_id,
            });

          if (milestoneError) {
            console.error("Error inserting milestone:", milestoneError);
            throw milestoneError;
          }
        }
      );

      await Promise.all(milestonesInsertPromises);

      return deliverableData;
    }
  );

  const deliverableResults = await Promise.all(deliverableInsertPromises);
  return deliverableResults;
};

/**
 * Function to update a deliverable
 * @param {any} deliverableData - The data for the new deliverable
 * @returns {Promise<{ id: number }>} - The created deliverable
 * @throws {Error} - If there is an error creating the deliverable
 * */
export const upsertDeliverablesWithMilestones = async (
  deliverables: any[],
  campaignID: UUID | null
) => {
  try {
    if (!campaignID) throw new Error("Campaign ID not provided");
    const updatedDeliverables = [];
    const updatedMilestones = [];

    for (const deliverable of deliverables) {
      const { id, milestones } = deliverable;

      const updatedDeliverable = await upsertDeliverable(
        deliverable,
        campaignID
      );
      updatedDeliverables.push(updatedDeliverable);

      if (!Array.isArray(milestones)) {
        console.error("Invalid milestones format:", milestones);
        continue;
      }

      for (const milestone of milestones) {
        const updatedMilestone = await upsertMilestone(
          milestone,
          updatedDeliverable.id,
          campaignID
        );
        updatedMilestones.push(updatedMilestone);
      }
    }

    return { deliverables: updatedDeliverables, milestones: updatedMilestones };
  } catch (error) {
    console.error("Error updating deliverables or milestones:", error);
    throw error;
  }
};

/**
 * Function to update the payment status of a campaign
 * @param {number} campaignID - The ID of the campaign to update
 * @param {string} paymentStatus - The new payment status
 * @returns {Promise<{ id: number }>} - The updated campaign
 * @throws {Error} - If there is an error updating the campaign
 * */
export const updateCampaignPaymentStatus = async (
  campaignID: UUID | null,
  paymentStatus: PaymentStatusType
): Promise<void> => {
  if (!campaignID) throw new Error("Campaign ID not provided");
  const paymentStatusLower = paymentStatus.toLowerCase();
  try {
    // Perform the update operation
    const { error: updateError } = await supabase
      .from("campaign_payment")
      .update({
        payment_status: paymentStatus,
        influencer_paid_date:
          paymentStatusLower === "influencer paid"
            ? new Date().toISOString()
            : null,
        manager_paid_date:
          paymentStatusLower === "agency paid" ||
          paymentStatusLower === "influencer paid"
            ? new Date().toISOString()
            : null,
        agency_paid_date:
          paymentStatusLower === "manager paid" ||
          paymentStatusLower === "agency paid" ||
          paymentStatusLower === "influencer paid"
            ? new Date().toISOString()
            : null,
      })
      .eq("campaign_id", campaignID);

    if (updateError) {
      console.error("Error updating campaign payment status:", updateError);
      throw new Error("Error updating campaign payment status");
    }
    return;

    // Retrieve the updated row
    // const { data, error: selectError } = await supabase
    //   .from("campaign_payment")
    //   .select("*") // Select all columns or specify the columns you need
    //   .eq("campaign_id", campaignID)
    //   .single(); // Use .single() to get a single row

    // if (selectError) {
    //   console.error(
    //     "Error retrieving updated campaign payment status:",
    //     selectError
    //   );
    //   throw new Error("Error retrieving updated campaign payment status");
    // }

    // return data; // Return the updated row
  } catch (error) {
    console.error("Error updating campaign payment status:", error);
    throw error;
  }
};
