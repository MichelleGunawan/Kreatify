"use client";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "@/context";

//Component import
import LoggedinLayout from "@/layouts/LoggedinLayout";
import HeaderAgency from "@/components/HeaderAgency";
import AgencyInfo from "@/components/AgencyInfo";
import ModalEditAgency from "@/components/ModalEditAgency";
import useAgencyData from "@/hooks/useAgencyData";

//CSS import
import "@/styles/agency.page.scss";
import { USER_PERMISSIONS } from "@/utils/constants";
import usePermission from "@/hooks/usePermission";
import { useSession } from "@/hooks/useSession";
import CardOnboardAgency from "@/components/CardOnboardAgency";

const AgencyPage = () => {
  const { sessionLoading } = useSession({});
  const { talentId, managerId } = useGlobalContext();
  const I1Permission = usePermission(USER_PERMISSIONS.TIER_I1);
  const M3Permission = usePermission(USER_PERMISSIONS.TIER_M3);
  const M1Permission = usePermission(USER_PERMISSIONS.TIER_M1);

  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [tab, setTab] = useState(0);

  const { agencies, setAgencies, loading } = useAgencyData({
    talentId: I1Permission ? talentId : null,
    managerId: M3Permission ? managerId : null,
  });
  const selectedAgency = agencies?.[tab]; // Get the selected agency based on the current tab

  const handleEditSave = (updatedAgency: {
    agency_name: string;
    agency_logo: string;
    agency_bio: string;
    agency_email: string;
    agency_phone: string;
    agency_website: string;
    agency_address: string;
    agency_city: string;
    agency_state: string;
    agency_country: string;
    agency_payment_options: string[];
  }) => {
    // Update frontend
    setAgencies((prevAgencies) =>
      prevAgencies.map((agency, index) =>
        index === tab ? { ...agency, ...updatedAgency } : agency
      )
    );
  };

  return (
    <LoggedinLayout headerTitle="Agency">
      {selectedAgency?.agency_name && selectedAgency?.agency_email ? (
        <>
          {M1Permission && (
            <HeaderAgency
              tabs={agencies.map((agency) => agency.agency_name)}
              tab={tab}
              setTab={setTab}
              handleEditButtonClick={() => setModalEditOpen(true)}
            />
          )}
          <div className="agency-page-first-section">
            <div className="agency-page-first-section-left">
              <AgencyInfo
                agencyName={selectedAgency?.agency_name}
                agencyLogo={selectedAgency?.agency_logo}
                agencyBio={selectedAgency?.agency_bio}
                agencyAddress={selectedAgency?.agency_address}
                agencyCity={selectedAgency?.agency_city}
                agencyState={selectedAgency?.agency_state}
                agencyCountry={selectedAgency?.agency_country}
                agencyEmail={selectedAgency?.agency_email}
                agencyPhone={selectedAgency?.agency_phone}
                agencyWebsite={selectedAgency?.agency_website}
                managerCount={selectedAgency?.manager_count}
                talentCount={selectedAgency?.talent_count}
                agencyDateFounded={selectedAgency?.agency_date_founded}
              />
            </div>
          </div>
        </>
      ) : (
        <div className="agency-page">
          {M1Permission && (
            <CardOnboardAgency setModalEditOpen={setModalEditOpen} />
          )}
          {!M1Permission && (
            <div className="h1 text-black">No agency info to display</div>
          )}
        </div>
      )}
      {modalEditOpen && (
        <ModalEditAgency
          setOpen={setModalEditOpen}
          agencyId={selectedAgency?.agency_id}
          agencyName={selectedAgency?.agency_name}
          agencyLogo={selectedAgency?.agency_logo}
          agencyBio={selectedAgency?.agency_bio}
          agencyAddress={selectedAgency?.agency_address}
          agencyCity={selectedAgency?.agency_city}
          agencyState={selectedAgency?.agency_state}
          agencyCountry={selectedAgency?.agency_country}
          agencyEmail={selectedAgency?.agency_email}
          agencyPhone={selectedAgency?.agency_phone}
          agencyWebsite={selectedAgency?.agency_website}
          agencyDateFounded={selectedAgency?.agency_date_founded}
          agencyPaymentOptions={selectedAgency?.agency_payment_options}
          handleEditSave={handleEditSave}
        />
      )}
    </LoggedinLayout>
  );
};

export default AgencyPage;
