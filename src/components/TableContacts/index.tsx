"use client";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "@/context";
// Custom components
import Pagination from "../Pagination";
import InputText from "../InputText";
import Button from "../Button";
import Table from "@/components/Table";
import ModalFilterContacts from "./modals/ModalFilter";
import ModalSort from "./modals/ModalSort";
import ModalConfirmDelete from "@/components/ModalConfirmDelete";
import { getIconLink } from "@/utils/functions/iconLinks";
import { ContactsFiltersType, ContactsTableRowType } from "@/types/table.type";
import { ContactsTableCols } from "./views";
import { deleteContact } from "@/services/contacts/contact_actions";
import Pill from "../Pill";
import { applyFiltersAndSort } from "./functions/filter.functions";
import "./styles/index.scss";
import "@/styles/table.scss";
import { COLORS_RGB } from "@/utils/constants";

const itemsPerPage = 10;
const TableContacts: React.FC<ContactsTableProps> = ({ title, data }) => {
  const { userPermission } = useGlobalContext();
  const [tableData, setTableData] = useState<ContactsTableRowType[]>([]);
  const [filteredTableData, setFilteredTableData] = useState<
    ContactsTableRowType[]
  >([]);
  const [search, setSearch] = useState("");
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [sortModalOpen, setSortModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRowIds, setSelectedRowIds] = useState<number[]>([]);

  // Filter variables
  const [partnershipStartDate, setPartnershipStartDate] = useState<
    string | null
  >(null);
  const [partnershipEndDate, setPartnershipEndDate] = useState<string | null>(
    null
  );
  const [valueLowerBound, setValueLowerBound] = useState<number | null>(null);
  const [valueUpperBound, setValueUpperBound] = useState<number | null>(null);
  const [partnershipCountLowerBound, setPartnershipCountLowerBound] = useState<
    number | null
  >(null);
  const [partnershipCountUpperBound, setPartnershipCountUpperBound] = useState<
    number | null
  >(null);
  const [typeFilters, setTypeFilters] = useState<string[]>([]);
  const [nichesFilters, setNichesFilters] = useState<string[]>([]);

  // Sort variables
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("Ascending");

  // Pagination
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;

  useEffect(() => {
    resetFilters();
    setTableData(data);
  }, [data]);

  useEffect(() => {
    setFilteredTableData(tableData);
  }, [tableData]);

  const onPageChange = (event: any) => {
    //TODO: fetch data from itemOffset + itemsPerPage
    setItemOffset(event);
  };

  const handleDelete = async () => {
    try {
      deleteContact(selectedRowIds);

      // Update local state
      setTableData((prevData) =>
        prevData.filter((item) => !selectedRowIds.includes(item.id))
      );
      setSelectedRowIds([]);
    } catch (error) {
      console.error("Error deleting rows:", error);
      // Handle error (e.g., show notification to the user)
    }
  };

  useEffect(() => {
    applyFiltersAndSort({
      tableData,
      setFilteredTableData,
      search,
      partnershipStartDate,
      partnershipEndDate,
      valueLowerBound,
      valueUpperBound,
      partnershipCountLowerBound,
      partnershipCountUpperBound,
      typeFilters,
      nichesFilters,
      sortBy,
      sortOrder,
    });
  }, [
    tableData,
    search,
    partnershipStartDate,
    partnershipEndDate,
    valueLowerBound,
    valueUpperBound,
    partnershipCountLowerBound,
    partnershipCountUpperBound,
    typeFilters,
    nichesFilters,
    sortBy,
    sortOrder,
  ]);

  const setFilters = ({
    partnershipStartDate,
    partnershipEndDate,
    valueLowerBound,
    valueUpperBound,
    partnershipCountLowerBound,
    partnershipCountUpperBound,
    typeFilters,
    nichesFilters,
  }: ContactsFiltersType) => {
    setPartnershipStartDate(partnershipStartDate);
    setPartnershipEndDate(partnershipEndDate);
    setValueLowerBound(valueLowerBound);
    setValueUpperBound(valueUpperBound);
    setPartnershipCountLowerBound(partnershipCountLowerBound);
    setPartnershipCountUpperBound(partnershipCountUpperBound);
    setTypeFilters(typeFilters);
    setNichesFilters(nichesFilters);
  };

  const setSort = ({
    sortBy,
    sortOrder,
  }: {
    sortBy: string;
    sortOrder: string;
  }) => {
    setSortBy(sortBy);
    setSortOrder(sortOrder);
  };

  const resetFilters = () => {
    setPartnershipStartDate(null);
    setPartnershipEndDate(null);
    setValueLowerBound(null);
    setValueUpperBound(null);
    setPartnershipCountLowerBound(null);
    setPartnershipCountUpperBound(null);
    setTypeFilters([]);
    setNichesFilters([]);
  };

  const isFilterActive = () => {
    return (
      partnershipStartDate ||
      partnershipEndDate ||
      valueLowerBound ||
      valueUpperBound ||
      partnershipCountLowerBound ||
      partnershipCountUpperBound ||
      typeFilters.length > 0 ||
      nichesFilters.length > 0
    );
  };

  const isSortActive = () => {
    return sortBy !== "";
  };

  return (
    <div className="table-card">
      <div className="table-header-container-row">
        <div className="table-header-left">
          <div className="h1 text-black">{title}</div>
        </div>
        <div className="table-header-right">
          {selectedRowIds.length < 1 && (
            <>
              <Button
                label="sort"
                icon={getIconLink("sort")}
                width="120px"
                height="40px"
                color="#555"
                borderColor="#C3C3C3"
                backgroundColor={
                  isSortActive() ? "var(--grey-color-300)" : "transparent"
                }
                borderRadius="10px"
                textClass="p"
                onClick={() => setSortModalOpen(true)}
              />
              <Button
                label="filter"
                icon={getIconLink("filter")}
                width="120px"
                height="40px"
                color="#555"
                borderColor="#C3C3C3"
                backgroundColor={
                  isFilterActive() ? "var(--grey-color-300)" : "transparent"
                }
                borderRadius="10px"
                textClass="p"
                onClick={() => setFilterModalOpen(true)}
              />
              <InputText
                placeholder="Search"
                value={search}
                onChange={(value) => setSearch(value)}
                height="40px"
              />
            </>
          )}
          {selectedRowIds.length > 0 && (
            <>
              <Button
                label="Delete"
                icon={getIconLink("trash")}
                width="100px"
                height="40px"
                color="#FF3A36"
                borderColor="#FF3A36"
                borderRadius="10px"
                textClass="p"
                onClick={() => setIsDeleteModalOpen(true)}
              />
              <Button
                label="Unselect All"
                width="100px"
                height="40px"
                color="#555"
                borderColor="#C3C3C3"
                borderRadius="10px"
                textClass="p"
                onClick={() => setSelectedRowIds([])}
              />
            </>
          )}
        </div>
      </div>

      <div className="table-filters-container hide-scrollbar">
        <div className="table-filters">
          {sortBy && (
            <Pill
              label={sortBy}
              onRemove={() => setSortBy("")}
              borderColor={`rgba(${COLORS_RGB.ACCENT2}, 0.25)`}
              backgroundColor={`rgba(${COLORS_RGB.ACCENT2}, 0.15)`}
            />
          )}
          {(partnershipStartDate || partnershipEndDate) && (
            <Pill
              label={"Last Partnership Date"}
              onRemove={() => {
                setPartnershipStartDate(null);
                setPartnershipEndDate(null);
              }}
              borderColor={`rgba(${COLORS_RGB.ACCENT1}, 0.25)`}
              backgroundColor={`rgba(${COLORS_RGB.ACCENT1}, 0.15)`}
            />
          )}

          {(valueLowerBound || valueUpperBound) && (
            <Pill
              label={"Avg Partnership Value"}
              onRemove={() => {
                setValueLowerBound(null);
                setValueUpperBound(null);
              }}
              borderColor={`rgba(${COLORS_RGB.ACCENT1}, 0.25)`}
              backgroundColor={`rgba(${COLORS_RGB.ACCENT1}, 0.15)`}
            />
          )}

          {(partnershipCountLowerBound || partnershipCountUpperBound) && (
            <Pill
              label={"# of Partnerships"}
              onRemove={() => {
                setPartnershipCountLowerBound(null);
                setPartnershipCountUpperBound(null);
              }}
              borderColor={`rgba(${COLORS_RGB.ACCENT1}, 0.25)`}
              backgroundColor={`rgba(${COLORS_RGB.ACCENT1}, 0.15)`}
            />
          )}
          {typeFilters.length > 0 && (
            <Pill
              label={"Type"}
              onRemove={() => {
                setTypeFilters([]);
              }}
              borderColor={`rgba(${COLORS_RGB.ACCENT1}, 0.25)`}
              backgroundColor={`rgba(${COLORS_RGB.ACCENT1}, 0.15)`}
            />
          )}
          {nichesFilters.length > 0 && (
            <Pill
              label={"Niche"}
              onRemove={() => {
                setNichesFilters([]);
              }}
              borderColor={`rgba(${COLORS_RGB.ACCENT1}, 0.25)`}
              backgroundColor={`rgba(${COLORS_RGB.ACCENT1}, 0.15)`}
            />
          )}
        </div>
      </div>

      <div className="table-contacts-container">
        <Table
          data={filteredTableData.slice(itemOffset, endOffset)}
          colInfo={ContactsTableCols}
          setSelectedRowIds={setSelectedRowIds}
          selectedRowIds={selectedRowIds}
        />
      </div>
      <div className="table-contacts-pagination">
        <Pagination
          itemOffset={itemOffset}
          totalItems={data.length}
          itemsPerPage={itemsPerPage}
          onPageChange={onPageChange}
        />
      </div>
      {sortModalOpen && (
        <ModalSort
          title="Sort Contacts"
          setSort={setSort}
          sortBy={sortBy}
          sortOrder={sortOrder}
          setOpen={setSortModalOpen}
        />
      )}
      {filterModalOpen && (
        <ModalFilterContacts
          title="Filter Contacts"
          setFilters={setFilters}
          partnershipStartDate={partnershipStartDate}
          partnershipEndDate={partnershipEndDate}
          valueLowerBound={valueLowerBound}
          valueUpperBound={valueUpperBound}
          partnershipCountLowerBound={partnershipCountLowerBound}
          partnershipCountUpperBound={partnershipCountUpperBound}
          typeFilters={typeFilters}
          nichesFilters={nichesFilters}
          setOpen={setFilterModalOpen}
        />
      )}
      {isDeleteModalOpen && (
        <ModalConfirmDelete
          number={selectedRowIds.length}
          setOpen={setIsDeleteModalOpen}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};
export default TableContacts;

type ContactsTableProps = {
  title: string;
  data: ContactsTableRowType[];
};
