"use client";
import React, { useEffect, useState } from "react";
import { UUID } from "crypto";
import { debounce } from "lodash"; // You might need to install lodash for debounce function

// Custom components
import Pagination from "../Pagination";
import InputText from "../InputText";
import Button from "../Button";
import Table from "@/components/Table";
import ModalFilter from "./modals/ModalFilter";
import ModalConfirmDelete from "@/components/ModalConfirmDelete";
import { CustomTablePanel } from "@/layouts/TabLayout";
import { getIconLink } from "@/utils/functions/iconLinks";
import { PitchlistTableRowType } from "@/types/table.type";
import { talentColInfo } from "./views";
import { deletePitchlists } from "@/services/pitchlists/delete_actions";

import "./styles/index.scss";
import "@/styles/table.scss";
import { COLORS } from "@/utils/constants";
import { convertToUUID } from "@/utils/functions/converter.functions";

const itemsPerPage = 10;
const TablePitchLists: React.FC<PitchListsTableProps> = ({ title, data }) => {
  const tab = 0;
  const [tableData, setTableData] = useState<PitchlistTableRowType[]>([]);
  const [filteredTableData, setFilteredTableData] = useState<
    PitchlistTableRowType[]
  >([]);

  const [search, setSearch] = useState("");
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRowIds, setSelectedRowIds] = useState<UUID[]>([]);
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;

  useEffect(() => {
    setTableData(data);
    setFilteredTableData(data);
  }, [data]);

  useEffect(() => {
    // Debounce the search input to avoid frequent filtering
    const debounceSearch = debounce(() => {
      if (search === "") {
        setFilteredTableData(data);
      } else {
        setFilteredTableData(
          data.filter((item) => {
            return (
              item.name.toLowerCase().includes(search.toLowerCase()) ||
              item.created_by?.name.toLowerCase() === search.toLowerCase() ||
              item.influencer_previews?.some(
                (preview) => preview.name.toLowerCase() == search.toLowerCase()
              )
            );
          })
        );
      }
    }, 300); // Adjust the debounce delay as needed

    debounceSearch();

    // Clean up the debounce function on component unmount
    return () => {
      debounceSearch.cancel();
    };
  }, [search, data]);

  const onPageChange = (event: any) => {
    setItemOffset(event);
    //TODO: fetch data from itemOffset + itemsPerPage
    setItemOffset(event);
  };

  const handleDelete = () => {
    deletePitchlists(selectedRowIds);
    setFilteredTableData((prevData) =>
      prevData.filter((item) => {
        const uuid = convertToUUID(item.id);
        return uuid === null || !selectedRowIds.includes(uuid);
      })
    );

    setSelectedRowIds([]);
  };

  return (
    <div className="table-card">
      <div className="table-header-container-row">
        <div className="table-header-left">
          <div className="h1 text-black">Pitch Lists ({tableData.length})</div>
        </div>
        <div className="table-header-right">
          {selectedRowIds.length < 1 && (
            <>
              {/* <Button
                label="filter"
                icon={getIconLink("filter")}
                width="120px"
                height="40px"
                color="#555"
                borderColor="#C3C3C3"
                borderRadius="10px"
                textClass="p"
                onClick={() => setFilterModalOpen(true)}
              /> */}
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
                label="Delete"
                icon={getIconLink("trash")}
                width="100px"
                height="40px"
                color={COLORS.RED}
                borderColor={COLORS.RED}
                borderRadius="10px"
                textClass="p"
                onClick={() => setIsDeleteModalOpen(true)}
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

      <CustomTablePanel index={0} tab={tab}>
        <Table
          data={filteredTableData.slice(itemOffset, endOffset)}
          colInfo={talentColInfo}
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

      {filterModalOpen && (
        <ModalFilter title="Filter Pitch Lists" setOpen={setFilterModalOpen} />
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
export default TablePitchLists;

type PitchListsTableProps = {
  title: string;
  data: PitchlistTableRowType[];
};
