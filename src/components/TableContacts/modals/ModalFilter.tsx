import React, { Dispatch, SetStateAction, useState } from "react";
import Modal from "@/components/Modal";
import InputText from "@/components/InputText";
import InputMultiselect from "@/components/InputMultiselect";
import { ContactsFiltersType, ContactsTableRowType } from "@/types/table.type";
import { campaignCategoryOptions } from "@/utils/variables/campaign.variables";
import "../styles/modals.scss";

const ModalFilter: React.FC<ModalFilterProps> = ({
  setOpen,
  title,
  setFilters,
  partnershipStartDate,
  partnershipEndDate,
  valueLowerBound,
  valueUpperBound,
  partnershipCountLowerBound,
  partnershipCountUpperBound,
  typeFilters,
  nichesFilters,
}) => {
  const typeOptions = ["Brand", "Agency", "Music"];
  const [newPatnershipStartDate, setNewPartnershipStartDate] =
    useState(partnershipStartDate);
  const [newPatnershipEndDate, setNewPartnershipEndDate] =
    useState(partnershipEndDate);
  const [newValueLowerBound, setNewValueLowerBound] = useState(valueLowerBound);
  const [newValueUpperBound, setNewValueUpperBound] = useState(valueUpperBound);
  const [newPartnershipCountLowerBound, setNewPartnershipCountLowerBound] =
    useState(partnershipCountLowerBound);
  const [newPartnershipCountUpperBound, setNewPartnershipCountUpperBound] =
    useState(partnershipCountUpperBound);
  const [newTypeFilters, setNewTypeFilters] = useState(typeFilters);
  const [newNichesFilters, setNewNichesFilters] = useState(nichesFilters);

  const handleFilterReset = () => {
    setNewPartnershipCountLowerBound(null);
    setNewPartnershipCountUpperBound(null);
    setNewPartnershipStartDate(null);
    setNewPartnershipEndDate(null);
    setNewValueLowerBound(null);
    setNewValueUpperBound(null);
    setNewTypeFilters([]);
    setNewNichesFilters([]);
  };

  const handleFilter = () => {
    setFilters({
      partnershipStartDate: newPatnershipStartDate,
      partnershipEndDate: newPatnershipEndDate,
      valueLowerBound: newValueLowerBound,
      valueUpperBound: newValueUpperBound,
      partnershipCountLowerBound: newPartnershipCountLowerBound,
      partnershipCountUpperBound: newPartnershipCountUpperBound,
      typeFilters: newTypeFilters,
      nichesFilters: newNichesFilters,
    });
    setOpen(false);
  };

  return (
    <Modal
      setOpen={setOpen}
      title={title}
      noButtonText="Reset"
      onNoButtonClick={handleFilterReset}
      goButtonText="Filter"
      onGoButtonClick={handleFilter}
    >
      <div className="modal-filter-contacts-body">
        <div className="modal-filter-contacts-section">
          <p className="h2 text-black"># of Partnerships</p>
          <div className="grid grid-col-2">
            <InputText
              label="From"
              value={newPartnershipCountLowerBound || ""}
              onChange={(e) => {
                setNewPartnershipCountLowerBound(Number(e));
              }}
              error=""
              type="number"
            />
            <InputText
              label="To"
              value={newPartnershipCountUpperBound || ""}
              onChange={(e) => setNewPartnershipCountUpperBound(Number(e))}
              error=""
              type="number"
            />
          </div>
        </div>
        <div className="modal-filter-contacts-section">
          <p className="h2 text-black">Last Partnership Date</p>
          <div className="grid grid-col-2">
            <InputText
              label="From"
              value={newPatnershipStartDate || ""}
              onChange={(e) => {
                setNewPartnershipStartDate(e);
              }}
              error=""
              placeholder="dd/mm/yyyy"
              type="date"
            />
            <InputText
              label="To"
              value={newPatnershipEndDate || ""}
              onChange={(e) => {
                setNewPartnershipEndDate(e);
              }}
              error=""
              placeholder="dd/mm/yyyy"
              type="date"
            />
          </div>
        </div>
        <div className="modal-filter-contacts-section">
          <p className="h2 text-black">Average Partnership Value</p>
          <div className="grid grid-col-2">
            <InputText
              label="From"
              value={newValueLowerBound || ""}
              onChange={(e) => {
                setNewValueLowerBound(Number(e));
              }}
              error=""
              type="number"
            />
            <InputText
              label="To"
              value={newValueUpperBound || ""}
              onChange={(e) => setNewValueUpperBound(Number(e))}
              error=""
              type="number"
            />
          </div>
        </div>
        <div className="modal-filter-contacts-section">
          <InputMultiselect
            label="Type"
            options={typeOptions}
            value={newTypeFilters}
            onChange={setNewTypeFilters}
          />
        </div>
        <div className="modal-filter-contacts-section">
          <InputMultiselect
            label="Niches"
            options={campaignCategoryOptions}
            value={newNichesFilters}
            onChange={setNewNichesFilters}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ModalFilter;

type ModalFilterProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  title?: string;
  setFilters: (filters: ContactsFiltersType) => void;
  partnershipStartDate: string | null;
  partnershipEndDate: string | null;
  valueLowerBound: number | null;
  valueUpperBound: number | null;
  partnershipCountLowerBound: number | null;
  partnershipCountUpperBound: number | null;
  typeFilters: string[];
  nichesFilters: string[];
};
