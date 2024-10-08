import {
  ManagersFilterParamsType,
  ManagersFiltersType,
  ManagersTableRowType,
} from "@/types/table.type";
import { set } from "lodash";

export const filterTableRows = ({
  tableData,
  roleFilters,
}: {
  tableData: ManagersTableRowType[];
} & ManagersFiltersType) => {
  const filteredTableData = tableData?.filter((row) => {
    // Initialize category filter with default true
    let rowFilter = true;
    if (row.role) {
      rowFilter = roleFilters.length === 0 || roleFilters.includes(row.role);
    }

    // Combine all filters
    const isRowValid = rowFilter;

    return isRowValid;
  });

  return filteredTableData;
};
const sortTableRows = ({
  tableData,
  sortBy,
  sortOrder,
}: {
  tableData: ManagersTableRowType[];
  sortBy: string | null;
  sortOrder: string;
}) => {
  return tableData?.sort((a, b) => {
    // Determine sorting order
    const isAscending = sortOrder === "Ascending";

    // Sorting by the specified criteria
    switch (sortBy) {
      case "Campaigns Created":
        return isAscending
          ? (a.num_campaigns_created || 0) - (b.num_campaigns_created || 0)
          : (b.num_campaigns_created || 0) - (a.num_campaigns_created || 0);

      case "Campaigns Managed":
        return isAscending
          ? (a.num_campaigns_managed || 0) - (b.num_campaigns_managed || 0)
          : (b.num_campaigns_managed || 0) - (a.num_campaigns_managed || 0);

      case "Total Value Created":
        return isAscending
          ? (a.value_campaigns_created || 0) - (b.value_campaigns_created || 0)
          : (b.value_campaigns_created || 0) - (a.value_campaigns_created || 0);

      case "Total Value Managed":
        return isAscending
          ? (a.value_campaigns_managed || 0) - (b.value_campaigns_managed || 0)
          : (b.value_campaigns_managed || 0) - (a.value_campaigns_managed || 0);

      default:
        return 0; // No sorting
    }
  });
};

export const applyFilterAndSort = ({
  tableData,
  setFilteredTableData,
  roleFilters,
  search,
  sortBy,
  sortOrder,
}: ManagersFilterParamsType) => {
  // Filter by search term
  const searchLower = search?.toLowerCase() || "";
  let filteredData = tableData?.filter((row) => {
    return (
      !search ||
      row.user.name?.toLowerCase().includes(searchLower) ||
      row.contact_info.email?.toLowerCase().includes(searchLower) ||
      row.contact_info.phone?.toLowerCase().includes(searchLower) ||
      row.contact_info.whatsapp?.toLowerCase().includes(searchLower) ||
      row.role?.toLowerCase() === searchLower
    );
  });

  // Filter data
  if (roleFilters.length !== 0) {
    filteredData = filterTableRows({
      tableData: filteredData,
      roleFilters,
    });
  }

  // Call the sorting function
  filteredData = sortTableRows({
    tableData: filteredData,
    sortBy,
    sortOrder,
  });

  setFilteredTableData(filteredData);
  return;
};
