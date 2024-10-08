"use client";
import React, { useEffect, useState } from "react";

// Component import
import LoggedinLayout from "@/layouts/LoggedinLayout";
import HeaderContacts from "@/components/HeaderContacts";
import TableContacts from "@/components/TableContacts";
import { addNewContact } from "@/services/contacts/contact_actions";

import { ContactType } from "@/types/contact.type";
import { useGlobalContext } from "@/context";
import useContactsData from "@/hooks/useContactsData";

// CSS import
import "@/styles/managers.page.scss";
import { useSession } from "@/hooks/useSession";

const ContactsPage = () => {
  const { sessionLoading } = useSession({});
  const { agencyId, managerId } = useGlobalContext();
  const [tab, setTab] = useState(0);
  const [contactsData, setContactsData] = useState<any[]>([]); // TODO: should be ContactsTableRowType[]

  const { managerContacts, agencyContacts } = useContactsData({
    managerId,
    agencyId,
  });

  useEffect(() => {
    if (tab === 0) {
      setContactsData(managerContacts);
    } else if (tab === 1) {
      setContactsData(agencyContacts);
    }
  }, [tab, managerContacts, agencyContacts]);

  const handleCreateContact = async (contactData: ContactType) => {
    try {
      const newContact = await addNewContact({ id: -1, ...contactData });
      if (newContact) {
        setContactsData((prevContacts) => [
          ...prevContacts,
          { contact_info: { email: newContact.email }, ...newContact },
        ]);
      }
    } catch (error) {
      alert(`Error adding new contact:${error}`);
    }
  };

  return (
    <LoggedinLayout headerTitle="Contacts">
      <HeaderContacts
        tab={tab}
        setTab={setTab}
        createContact={handleCreateContact}
      />
      <div className="grid grid-col-1">
        <TableContacts title="" data={contactsData} />
      </div>
    </LoggedinLayout>
  );
};

export default ContactsPage;
