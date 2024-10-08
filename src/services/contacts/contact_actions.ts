import { API_BACKEND_ERROR_MESSAGE } from "@/shared/errors";
import { supabase } from "@/utils/supabase/js/client";
import { cache } from "react";
import { Database } from "@/utils/supabase/js/database.types";
import { UUID } from "crypto";

type ContactsTableView =
  Database["public"]["Views"]["contacts_table_view"]["Row"];
type ContactType = Database["public"]["Tables"]["contact"]["Row"];

/**
 * Contains functions to fetch contacts for a given agency.
 * @function fetchAgencyContacts - Returns a list of contact info for a given agency ID.
 * @param {UUID} agencyID - Agency ID to fetch contacts for.
 * @returns {ContactsTableView[]} - List of contact info for the given agency ID.
 **/
export const fetchAgencyContacts = cache(
  async (agencyID: UUID): Promise<ContactsTableView[]> => {
    const { data, error } = await supabase
      .from("contacts_table_view")
      .select("*")
      .eq("agency_id", agencyID);

    if (error) {
      console.error(`${API_BACKEND_ERROR_MESSAGE} fetchAgencyContacts`, error);
      return []; // Return an empty array if there's an error
    }

    return data;
  }
);

/**
 * Contains functions to fetch contacts for a given manager.
 * * @function fetchManagerContacts - Returns a list of contact info for a given manager ID.
 * @param {UUID} managerID - Manager ID to fetch contacts for.
 * @returns {ContactsTableView[]} - List of contact info for the given manager ID.
 **/
export const fetchManagerContacts = cache(
  async (managerID: UUID): Promise<ContactsTableView[]> => {
    const { data, error } = await supabase
      .from("contacts_table_view")
      .select("*")
      .eq("manager_id", managerID);
    if (error) {
      console.error(`${API_BACKEND_ERROR_MESSAGE} fetchAgencyContacts`, error);
      return []; // Return an empty array if there's an error
    }

    return data;
  }
);

/**
 * Contains functions to add a new contact.
 * @function addNewContact - Adds a new contact to the database.
 * @param {number} agency_id - Agency ID to add the contact to.
 * @param {UUID} manager_id - Manager ID to add the contact to.
 * @param {string} name - Name of the contact.
 * @param {string} email - Email of the contact.
 * @param {string} brand - Brand of the contact.
 * @param {string} type - Type of the contact.
 * @param {string} position - Position of the contact.
 * @returns {ContactsTableView} - The newly added contact.
 * @throws {Error} - If there's an error adding the contact.
 **/
export const addNewContact = async ({
  agency_id,
  manager_id,
  name,
  email,
  brand,
  type,
  position,
}: ContactType) => {
  const { data, error } = await supabase
    .from("contact")
    .insert({
      name,
      email,
      brand,
      type,
      position,
      manager_id,
      agency_id,
    })
    .select(); // Ensure you use `.select()` to include the new row data

  if (error) {
    console.error("Supabase Insert Error:", error);
    throw new Error(
      `${API_BACKEND_ERROR_MESSAGE} addNewContact. Error: ${JSON.stringify(
        error
      )}`
    );
  }

  // Check if data exists and return the first element or an empty object
  return data && data.length > 0 ? data[0] : null;
};

/**
 * Deletes one or more contacts from the database by their IDs.
 * @param {string[]} contactIDs - IDs of the contacts to delete.
 * @returns {Promise<ContactsTableView[]>} - The deleted contacts.
 * @throws {Error} - If there's an error during deletion.
 */
export const deleteContact = async (contactIDs: number[]) => {
  // First, update the campaign table to set brand_contact_id to null for the contacts being deleted
  const { error: updateError } = await supabase
    .from("campaign")
    .update({ brand_contact_id: null })
    .in("brand_contact_id", contactIDs); // Ensure you're using the correct foreign key

  if (updateError) {
    console.error("Supabase Update Error:", updateError);
    throw new Error(
      `${API_BACKEND_ERROR_MESSAGE} deleteContact. Error: ${JSON.stringify(
        updateError
      )}`
    );
  }

  // Now delete the contacts
  const { data, error: deleteError } = await supabase
    .from("contact") // Replace with your actual table name
    .delete()
    .in("id", contactIDs);

  if (deleteError) {
    console.error("Supabase Delete Error:", deleteError);
    throw new Error(
      `${API_BACKEND_ERROR_MESSAGE} deleteContact. Error: ${JSON.stringify(
        deleteError
      )}`
    );
  }

  return data; // Optionally return the deleted data or a success message
};
