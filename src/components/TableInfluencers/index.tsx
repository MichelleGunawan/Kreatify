"use client";
import React, { useState, useEffect, useRef } from "react";

// Custom components
import Pagination from "@/components/Pagination";
import InputText from "@/components/InputText";
import Button from "@/components/Button";
import Table from "@/components/Table";
import CustomTabs from "@/components/Tabs";
import ModalFilterTalent from "./modals/ModalFilter";
import ModalConfirmDelete from "../ModalConfirmDelete";
import ModalPitchList from "../ModalPitchList";
import { CustomTablePanel } from "@/layouts/TabLayout";
import { getIconLink } from "@/utils/functions/iconLinks";
import { TalentTableRowType } from "@/types/table.type";
import { socialInfoCols, basicInfoCols, partnershipInfoCols } from "./views";
import "./styles/index.scss";
import "@/styles/table.scss";
import { COLORS } from "@/utils/constants";

const itemsPerPage = 10;
const TableInfluencers: React.FC<TalentTableProps> = ({
  title,
  basicInfoData,
}) => {
  const [tab, setTab] = useState(0);
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);
  const [tableData, setTableData] = useState<any[]>(basicInfoData);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isModalPitchListOpen, setIsModalPitchListOpen] = useState(false);
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;

  const onPageChange = (event: any) => {
    setItemOffset(event);
    //TODO: fetch data from itemOffset + itemsPerPage
  };

  useEffect(() => {
    setSelectedRowIds([]);
  }, [tab]);

  useEffect(() => {
    setTableData(basicInfoData);
  }, [basicInfoData]);

  return (
    <div className="table-card">
      <div className="table-header-container-row">
        <div className="table-header-left">
          <CustomTabs
            tabs={["Socials Info", "Basic Info", "Partnership Info"]}
            tab={tab}
            setTab={setTab}
          />
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
                borderRadius="10px"
                textClass="p"
                onClick={() => setFilterModalOpen(true)}
              />
              <Button
                label="filter"
                icon={getIconLink("filter")}
                width="120px"
                height="40px"
                color={COLORS.GREY500}
                borderColor={COLORS.GREY400}
                borderRadius="10px"
                textClass="p"
                onClick={() => setFilterModalOpen(true)}
              />
              <InputText
                placeholder="Search"
                value={search}
                onChange={setSearch}
                height="40px"
              />
            </>
          )}
          {selectedRowIds.length > 0 && (
            <>
              <Button
                label="Create Pitch List"
                icon={getIconLink("addpitchlist")}
                width="164px"
                height="40px"
                color={COLORS.PRIMARY}
                borderColor={COLORS.PRIMARY}
                borderRadius="10px"
                textClass="p"
                onClick={() => {
                  setIsModalPitchListOpen(true);
                }}
              />

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

      <CustomTablePanel tab={tab} index={0}>
        <Table
          data={tableData.slice(itemOffset, endOffset)}
          colInfo={socialInfoCols}
          setSelectedRowIds={setSelectedRowIds}
          selectedRowIds={selectedRowIds}
        />
      </CustomTablePanel>
      <CustomTablePanel tab={tab} index={1}>
        <Table
          data={tableData.slice(itemOffset, endOffset)}
          colInfo={basicInfoCols}
          setSelectedRowIds={setSelectedRowIds}
          selectedRowIds={selectedRowIds}
        />
      </CustomTablePanel>
      <CustomTablePanel tab={tab} index={2}>
        <Table
          data={tableData.slice(itemOffset, endOffset)}
          colInfo={partnershipInfoCols}
          setSelectedRowIds={setSelectedRowIds}
          selectedRowIds={selectedRowIds}
        />
      </CustomTablePanel>

      <div className="table-pagination-container">
        <Pagination
          itemOffset={itemOffset}
          totalItems={basicInfoData.length}
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

      {filterModalOpen && (
        <ModalFilterTalent
          title="Filter Talents"
          setOpen={setFilterModalOpen}
        />
      )}

      {isModalPitchListOpen && (
        <ModalPitchList
          title="Create Pitch List"
          setOpen={setIsModalPitchListOpen}
          selectedUsers={selectedRowIds}
        />
      )}
    </div>
  );
};

export default TableInfluencers;

type TalentTableProps = {
  title: string;
  basicInfoData: TalentTableRowType[];
};
