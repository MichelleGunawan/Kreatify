"use client";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "@/context";
// Custom components
import Pagination from "../Pagination";
import InputText from "../InputText";
import Button from "../Button";
import Table from "@/components/Table";
import ModalFilter from "./modals/ModalFilter";
import Pill from "../Pill";
import ModalSort from "./modals/ModalSort";
import { CustomTablePanel } from "@/layouts/TabLayout";
import { getIconLink } from "@/utils/functions/iconLinks";
import { ManagersFiltersType, ManagersTableRowType } from "@/types/table.type";
import {
  ManagersTableColsInfluencerView,
  ManagersTableColsManagerView,
} from "./views";
import { applyFilterAndSort } from "./functions/filter.functions";
import "./styles/index.scss";
import "@/styles/table.scss";
import usePermission from "@/hooks/usePermission";
import { COLORS, COLORS_RGB, USER_PERMISSIONS } from "@/utils/constants";

const itemsPerPage = 10;
const TableManagers: React.FC<ManagersTableProps> = ({ title, data }) => {
  const tab: number = 0;
  const [tableData, setTableData] = useState<ManagersTableRowType[]>(data);
  const [search, setSearch] = useState("");
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [sortModalOpen, setSortModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);
  const [filteredTableData, setFilteredTableData] = useState<
    ManagersTableRowType[]
  >([]);

  // Filter variables
  const [roleFilters, setRoleFilters] = useState<string[]>([]);

  // Sort variables
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState("Ascending");

  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;

  useEffect(() => {
    setTableData(data);
    resetFiltersAndSort();
  }, [data]);

  useEffect(() => {
    setFilteredTableData(tableData);
  }, [tableData]);

  useEffect(() => {
    setTableData(data);
  }, [data]);

  useEffect(() => {
    setFilteredTableData(tableData);
  }, [tableData]);

  const onPageChange = (event: any) => {
    setItemOffset(event);
  };

  const resetFiltersAndSort = () => {
    setRoleFilters([]);
    setSortBy(null);
    setSortOrder("Ascending");
  };

  const setFilters = ({ roleFilters }: ManagersFiltersType) => {
    setRoleFilters(roleFilters);
  };

  const setSort = ({
    sortBy,
    sortOrder,
  }: {
    sortBy: string | null;
    sortOrder: string;
  }) => {
    setSortBy(sortBy);
    setSortOrder(sortOrder);
  };

  useEffect(() => {
    applyFilterAndSort({
      tableData,
      setFilteredTableData,
      roleFilters,
      search,
      sortBy,
      sortOrder,
    });
  }, [tableData, roleFilters, search, sortBy, sortOrder]);

  const isFilterActive = roleFilters.length > 0;

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
                color={COLORS.GREY500}
                borderColor={COLORS.GREY400}
                backgroundColor={
                  sortBy ? "var(--grey-color-300)" : "transparent"
                }
                borderRadius="10px"
                textClass="p"
                onClick={() => setSortModalOpen(true)}
              />
              <Button
                label="filter"
                icon={getIconLink("filter")}
                width="100px"
                height="40px"
                color={COLORS.GREY500}
                backgroundColor={
                  isFilterActive ? COLORS.GREY300 : "transparent"
                }
                borderColor="#C3C3C3"
                borderRadius="10px"
                textClass="p"
                onClick={() => setFilterModalOpen(true)}
              />
              <InputText
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e)}
                height="40px"
              />
            </>
          )}
          {selectedRowIds.length > 0 && (
            <>
              <Button
                label="Unselect All"
                width="100px"
                height="40px"
                color={COLORS.GREY500}
                borderColor={COLORS.GREY400}
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
              borderColor={`rgba(${COLORS_RGB.PRIMARY}, 0.25)`}
              backgroundColor={`rgba(${COLORS_RGB.PRIMARY}, 0.15)`}
            />
          )}
          {roleFilters.length > 0 && (
            <Pill
              label={"Role"}
              onRemove={() => {
                setRoleFilters([]);
              }}
              borderColor={`rgba(${COLORS_RGB.ACCENT1}, 0.25)`}
              backgroundColor={`rgba(${COLORS_RGB.ACCENT1}, 0.15)`}
            />
          )}
        </div>
      </div>
      <CustomTablePanel index={0} tab={tab}>
        <Table
          data={filteredTableData.slice(itemOffset, endOffset)}
          colInfo={
            usePermission(USER_PERMISSIONS.TIER_M3)
              ? ManagersTableColsManagerView
              : ManagersTableColsInfluencerView
          }
          setSelectedRowIds={setSelectedRowIds}
          selectedRowIds={selectedRowIds}
        />
      </CustomTablePanel>

      <div className="table-pagination-container">
        <Pagination
          itemOffset={itemOffset}
          totalItems={data.length}
          itemsPerPage={itemsPerPage}
          onPageChange={onPageChange}
        />
      </div>
      <div className="table-load-button-container">
        {/* <Button
          label="Load More"
          borderColor="#775fff"
          color="#775fff"
          borderRadius="10px"
        /> */}
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
        <ModalFilter
          title="Filter Managers"
          setOpen={setFilterModalOpen}
          setFilters={setFilters}
          roleFilters={roleFilters}
        />
      )}
    </div>
  );
};
export default TableManagers;

type ManagersTableProps = {
  title: string;
  data: ManagersTableRowType[];
};
