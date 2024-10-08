import React, { Dispatch, SetStateAction, useState } from "react";
import { useGlobalContext } from "@/context";
import Modal from "@/components/Modal";
import InputMultiselect from "@/components/InputMultiselect";
import InputMultiselectUser from "@/components/InputMultiselectUser";
import {
  campaignCategoryOptions,
  paymentStatusOptions,
} from "@/utils/variables/campaign.variables";
import { CampaignsFiltersType } from "@/types/table.type";
import { CampaignStatusType } from "@/types/campaign.type";
import { UserPreviewType } from "@/types/user.type";
import useUsersData from "@/hooks/useUsersData";
import "../styles/modals.scss";

const ModalFilter: React.FC<ModalFilterProps> = ({
  setOpen,
  title,
  setFilters,
  campaignStatus,
  talentManagerFilters,
  campaignManagerFilters,
  influencerFilters,
  paymentStatusFilters,
  categoryFilters,
}) => {
  const { agencyId } = useGlobalContext();
  const { talentsByAgency, managersByAgency } = useUsersData({ agencyId });
  const [newTalentManagerFilters, setNewTalentManagerFilters] =
    useState<string[]>(talentManagerFilters);
  const [newCampaignManagerFilters, setNewCampaignManagerFilters] = useState<
    string[]
  >(campaignManagerFilters);
  const [newInfluencerFilters, setNewInfluencerFilters] =
    useState<string[]>(influencerFilters);
  const [newCategory, setNewCategory] = useState<string[]>(categoryFilters);
  const [newPaymentStatus, setNewPaymentStatus] =
    useState<string[]>(paymentStatusFilters);

  const handleReset = () => {
    setNewTalentManagerFilters([]);
    setNewCampaignManagerFilters([]);
    setNewInfluencerFilters([]);
    setNewPaymentStatus([]);
    setNewCategory([]);
  };
  const handleFilter = () => {
    setFilters({
      talentManagerFilters: newTalentManagerFilters,
      campaignManagerFilters: newCampaignManagerFilters,
      influencerFilters: newInfluencerFilters,
      paymentStatusFilters: newPaymentStatus,
      categoryFilters: newCategory,
    });

    setOpen(false);
  };

  return (
    <Modal
      setOpen={setOpen}
      title={title}
      noButtonText="Reset"
      onNoButtonClick={handleReset}
      goButtonText="Filter" //TODO: add input function props
      onGoButtonClick={handleFilter}
    >
      <div className="modal-filter-campaigns-body">
        <InputMultiselectUser
          label="Owned By"
          options={managersByAgency}
          value={newTalentManagerFilters}
          onChange={setNewTalentManagerFilters}
        />
        <InputMultiselectUser
          label="Managed By"
          options={managersByAgency}
          value={newCampaignManagerFilters}
          onChange={setNewCampaignManagerFilters}
        />

        <InputMultiselectUser
          label="Influencers"
          options={talentsByAgency}
          value={newInfluencerFilters}
          onChange={setNewInfluencerFilters}
        />
        <InputMultiselect
          label="Categories"
          options={campaignCategoryOptions}
          value={newCategory}
          onChange={setNewCategory}
        />
        {/* <InputText label="Brand" value={brandFilters} onChange={setBrand} /> */}

        {/* <div className="modal-filter-campaigns-section ">
          <p className="h2 text-black">Influencer Type</p>
          <div className="modal-filter-campaigns-checkbox-container two-col">
            {campaignsRoles.map((role) => (
              <React.Fragment key={role}>
                <Checkbox
                  label={role}
                  isChecked={roles[role]}
                  onClick={() => handleRolesChange(role)}
                />
              </React.Fragment>
            ))}
          </div>
        </div> */}

        {campaignStatus === "completed" && (
          <div className="modal-filter-campaigns-section ">
            <p className="h2 text-black">Payment Status</p>
            <div className="modal-filter-campaigns-checkbox-container two-col">
              <InputMultiselect
                label="Payment Status"
                options={paymentStatusOptions}
                value={newPaymentStatus}
                onChange={setNewPaymentStatus}
              />
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ModalFilter;

type ModalFilterProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  title?: string;
  setFilters: (filters: CampaignsFiltersType) => void;
  campaignStatus: CampaignStatusType;
  talentManagerFilters: string[];
  campaignManagerFilters: string[];
  influencerFilters: string[];
  paymentStatusFilters: string[];
  categoryFilters: string[];
};
