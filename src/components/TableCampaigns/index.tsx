import React, { useEffect, useState, useRef } from "react";
import { useGlobalContext } from "@/context";
// Custom components
import Pagination from "@/components/Pagination";
import InputText from "@/components/InputText";
import Button from "@/components/Button";
import Table from "@/components/Table";
import CustomTabs from "@/components/Tabs";
import ModalFilter from "./modals/ModalFilter";
import ModalSort from "./modals/ModalSort";
import Pill from "../Pill";
import ModalConfirmDelete from "../ModalConfirmDelete";
import useIsWidthLessThan from "@/hooks/layoutHooks";
import { CustomTablePanel } from "@/layouts/TabLayout";
import { getIconLink } from "@/utils/functions/iconLinks";
import { getCampaignCols, getCampaignTabs } from "./views";
import { getCampaignStatus } from "./functions";
import { deleteCampaigns } from "@/services/campaigns/delete_actions";
import {
  ManagementPendingCampaignTableRowType,
  ManagementOngoingCampaignTableRowType,
  ManagementCompletedCampaignTableRowType,
  ManagementRejectedCampaignTableRowType,
  TalentPendingCampaignTableRowType,
  TalentOngoingCampaignTableRowType,
  TalentCompletedCampaignTableRowType,
  CampaignsFiltersType,
} from "@/types/table.type";

import { UUID } from "crypto";
import { applyFiltersAndSort } from "./functions/filter.functions";
import { UserPreviewType } from "@/types/user.type";
import usePermission from "@/hooks/usePermission";
import { COLORS_RGB, USER_PERMISSIONS } from "@/utils/constants";
import "./styles/index.scss";
import "@/styles/table.scss";

const itemsPerPage = 10;
const TableCampaigns: React.FC<TableCampaignsProps> = ({
  title,
  pendingCampaignsData,
  ongoingCampaignsData,
  completedCampaignsData,
  rejectedCampaignsData = [],
}) => {
  const I1Permission = usePermission(USER_PERMISSIONS.TIER_I1);
  const M3Permission = usePermission(USER_PERMISSIONS.TIER_M3);

  const cardRef = useRef<HTMLDivElement>(null);
  const isSmall = useIsWidthLessThan(cardRef, 680);
  const [tab, setTab] = useState(0);
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [sortModalOpen, setSortModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedRowIds, setSelectedRowIds] = useState<UUID[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [tableData, setTableData] = useState<any[]>(pendingCampaignsData);
  const [filteredTableData, setFilteredTableData] = useState<any[]>([]);

  // Filter variables
  const [talentManagerFilters, setTalentManagerFilters] = useState<string[]>(
    []
  );
  const [campaignManagerFilters, setCampaignManagerFilters] = useState<
    string[]
  >([]);
  const [influencerFilters, setInfluencerId] = useState<string[]>([]);
  const [paymentStatusFilters, setPaymentStatusFilters] = useState<string[]>(
    []
  );
  const [categoryFilters, setCategoryFilters] = useState<string[]>([]);

  // Sort variables
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("Ascending");

  // Pagination
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;

  useEffect(() => {
    if (tab === 0) {
      setTableData(pendingCampaignsData);
    } else if (tab === 1) {
      setTableData(ongoingCampaignsData);
    } else if (tab === 2) {
      setTableData(completedCampaignsData);
    } else if (tab === 3) {
      setTableData(rejectedCampaignsData);
    }
    setSelectedRowIds([]);
  }, [
    tab,
    pendingCampaignsData,
    ongoingCampaignsData,
    completedCampaignsData,
    rejectedCampaignsData,
  ]);

  useEffect(() => {
    setFilteredTableData(tableData);
    resetFiltersAndSort();
  }, [tableData]);

  useEffect(() => {
    setTab(pendingCampaignsData.length === 0 ? 1 : 0);
  }, [pendingCampaignsData]);

  useEffect(() => {
    setFilteredTableData(tableData);
  }, [tableData]);

  const onPageChange = (event: any) => {
    setItemOffset(event);
    //TODO: fetch data from itemOffset + itemsPerPage
    setItemOffset(event);
  };

  const handleDelete = () => {
    deleteCampaigns(selectedRowIds);
    setTableData((prevData) =>
      prevData.filter((item) => !selectedRowIds.includes(item.id))
    );
    setSelectedRowIds([]);
  };

  useEffect(() => {
    applyFiltersAndSort({
      tableData,
      setFilteredTableData,
      search,
      talentManagerFilters,
      campaignManagerFilters,
      influencerFilters,
      paymentStatusFilters,

      categoryFilters,
      sortBy,
      sortOrder,
    });
  }, [
    tableData,
    search,
    talentManagerFilters,
    campaignManagerFilters,
    influencerFilters,
    paymentStatusFilters,

    categoryFilters,
    sortBy,
    sortOrder,
  ]);

  const setFilters = ({
    talentManagerFilters,
    campaignManagerFilters,
    influencerFilters,

    categoryFilters,
  }: CampaignsFiltersType) => {
    setTalentManagerFilters(talentManagerFilters);
    setCampaignManagerFilters(campaignManagerFilters);
    setInfluencerId(influencerFilters);
    setCategoryFilters(categoryFilters);
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

  const resetFiltersAndSort = () => {
    setTalentManagerFilters([]);
    setCampaignManagerFilters([]);
    setInfluencerId([]);
    setPaymentStatusFilters([]);
    setCategoryFilters([]);
    setSortBy("");
    setSortOrder("Ascending");
  };

  const isFilterActive = () => {
    return (
      talentManagerFilters.length > 0 ||
      campaignManagerFilters.length > 0 ||
      influencerFilters.length > 0 ||
      categoryFilters.length > 0
    );
  };

  const isSortActive = () => {
    return sortBy != "";
  };

  return (
    <div className="table-card" ref={cardRef}>
      <div
        className={`${
          isSmall ? "table-header-container-col" : "table-header-container-row"
        } `}
      >
        <CustomTabs
          tabs={getCampaignTabs(I1Permission, M3Permission)}
          tab={tab}
          setTab={setTab}
        />
      </div>
      <div
        className={`${
          isSmall ? "table-header-container-col" : "table-header-container-row"
        } `}
      >
        <div className="table-header-left">
          <h1 className="h1 text-black">
            {tab == 0
              ? `Pending Campaigns (${tableData.length})`
              : tab == 1
              ? `Ongoing Campaigns (${tableData.length})`
              : tab == 2
              ? `Completed Campaigns (${tableData.length})`
              : `Rejected Campaigns (${tableData.length})`}
          </h1>
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
                backgroundColor={isSortActive() ? "var(--grey-color-300)" : ""}
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
                  isFilterActive() ? "var(--grey-color-300)" : ""
                }
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
                label="Delete"
                icon={getIconLink("trash")}
                width="120px"
                height="40px"
                color="#FF3A36"
                borderColor="#FF3A36"
                borderRadius="10px"
                textClass="p"
                onClick={() => setIsDeleteModalOpen(true)}
              />
              <Button
                label="Unselect All"
                width="120px"
                height="40px"
                color="var(--grey-color-500, #555"
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
              borderColor={`rgba(${COLORS_RGB.PRIMARY}, 0.25) `}
              backgroundColor={`rgba(${COLORS_RGB.PRIMARY}, 0.15) `}
            />
          )}
          {talentManagerFilters.length > 0 && (
            <Pill
              label={"Owned By"}
              onRemove={() => {
                setTalentManagerFilters([]);
              }}
              borderColor={`rgba(${COLORS_RGB.ACCENT1}, 0.25)`}
              backgroundColor={`rgba(${COLORS_RGB.ACCENT1}, 0.15)`}
            />
          )}

          {campaignManagerFilters.length > 0 && (
            <Pill
              label={"Managed By"}
              onRemove={() => {
                setCampaignManagerFilters([]);
              }}
              borderColor={`rgba(${COLORS_RGB.ACCENT1}, 0.25)`}
              backgroundColor={`rgba(${COLORS_RGB.ACCENT1}, 0.15)`}
            />
          )}

          {influencerFilters.length > 0 && (
            <Pill
              label={"Influencer"}
              onRemove={() => {
                setInfluencerId([]);
              }}
              borderColor={`rgba(${COLORS_RGB.ACCENT1}, 0.25)`}
              backgroundColor={`rgba(${COLORS_RGB.ACCENT1}, 0.15)`}
            />
          )}
          {paymentStatusFilters.length > 0 && (
            <Pill
              label={"Payment Status"}
              onRemove={() => {
                setPaymentStatusFilters([]);
              }}
              borderColor={`rgba(${COLORS_RGB.ACCENT1}, 0.25)`}
              backgroundColor={`rgba(${COLORS_RGB.ACCENT1}, 0.15)`}
            />
          )}
          {categoryFilters.length > 0 && (
            <Pill
              label={"Category"}
              onRemove={() => {
                setCategoryFilters([]);
              }}
              borderColor={`rgba(${COLORS_RGB.ACCENT1}, 0.25)`}
              backgroundColor={`rgba(${COLORS_RGB.ACCENT1}, 0.15)`}
            />
          )}
        </div>
      </div>
      <CustomTablePanel tab={tab} index={0} isSmall={isSmall}>
        <Table
          data={filteredTableData.slice(itemOffset, itemOffset + itemsPerPage)}
          colInfo={getCampaignCols("pending", I1Permission, M3Permission)}
          setSelectedRowIds={setSelectedRowIds}
          selectedRowIds={selectedRowIds}
          isSmall={isSmall}
        />
      </CustomTablePanel>
      <CustomTablePanel tab={tab} index={1} isSmall={isSmall}>
        <Table
          data={filteredTableData.slice(itemOffset, itemOffset + itemsPerPage)}
          colInfo={getCampaignCols("ongoing", I1Permission, M3Permission)}
          setSelectedRowIds={setSelectedRowIds}
          selectedRowIds={selectedRowIds}
          isSmall={isSmall}
        />
      </CustomTablePanel>
      <CustomTablePanel tab={tab} index={2} isSmall={isSmall}>
        <Table
          data={filteredTableData.slice(itemOffset, itemOffset + itemsPerPage)}
          colInfo={getCampaignCols("completed", I1Permission, M3Permission)}
          setSelectedRowIds={setSelectedRowIds}
          selectedRowIds={selectedRowIds}
          isSmall={isSmall}
        />
      </CustomTablePanel>
      <CustomTablePanel tab={tab} index={3} isSmall={isSmall}>
        <Table
          data={filteredTableData.slice(itemOffset, itemOffset + itemsPerPage)}
          colInfo={getCampaignCols("rejected", I1Permission, M3Permission)}
          setSelectedRowIds={setSelectedRowIds}
          selectedRowIds={selectedRowIds}
          isSmall={isSmall}
        />
      </CustomTablePanel>
      <div className="table-footer">
        {isSmall ? (
          <></>
        ) : (
          // <Button
          //   label="Load More"
          //   borderColor="#775fff"
          //   color="#775fff"
          //   borderRadius="10px"
          // />
          <Pagination
            itemOffset={itemOffset}
            totalItems={
              tab == 0
                ? pendingCampaignsData.length
                : tab == 1
                ? ongoingCampaignsData.length
                : completedCampaignsData.length
            }
            itemsPerPage={itemsPerPage}
            onPageChange={onPageChange}
          />
        )}
      </div>

      {sortModalOpen && (
        <ModalSort
          title="Sort Campaigns"
          setOpen={setSortModalOpen}
          campaignStatus={getCampaignStatus(tab)}
          setSort={setSort}
          sortBy={sortBy}
          sortOrder={sortOrder}
        />
      )}
      {filterModalOpen && (
        <ModalFilter
          title="Filter Campaigns"
          setOpen={setFilterModalOpen}
          campaignStatus={getCampaignStatus(tab)}
          setFilters={setFilters}
          talentManagerFilters={talentManagerFilters}
          campaignManagerFilters={campaignManagerFilters}
          influencerFilters={influencerFilters}
          paymentStatusFilters={paymentStatusFilters}
          categoryFilters={categoryFilters}
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

export default TableCampaigns;

type TableCampaignsProps = {
  title: string;
  pendingCampaignsData:
    | ManagementPendingCampaignTableRowType[]
    | TalentPendingCampaignTableRowType[];
  ongoingCampaignsData:
    | ManagementOngoingCampaignTableRowType[]
    | TalentOngoingCampaignTableRowType[];
  completedCampaignsData:
    | ManagementCompletedCampaignTableRowType[]
    | TalentCompletedCampaignTableRowType[];
  rejectedCampaignsData: ManagementRejectedCampaignTableRowType[];
};
