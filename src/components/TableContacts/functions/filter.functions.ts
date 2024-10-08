import {
  ContactFilterFunctionParamsType,
  ContactsFiltersType,
  ContactsTableRowType,
} from "@/types/table.type";

// Filter by number of partnerships
export const filterByNumPartnerships = (
  data: ContactsTableRowType[],
  lowerBound: number | null,
  upperBound: number | null
) => {
  return data.filter((row) => {
    const value = row.num_of_partnerships ? row.num_of_partnerships : 0;

    const lower = lowerBound !== null ? lowerBound : -Infinity; // No limit if lowerBound is not set
    const upper = upperBound !== null ? upperBound : Infinity; // No limit if upperBound is not set

    return value >= lower && value <= upper;
  });
};

// Filter by partnership date range
export const filterByPartnershipDate = (
  data: ContactsTableRowType[],
  startDate: string | null,
  endDate: string | null
) => {
  return data.filter(({ last_partnership_date }) => {
    if (!last_partnership_date) return false; // Exclude rows without a partnership date

    const partnershipDate = new Date(last_partnership_date).getTime();
    const start = startDate ? new Date(startDate).getTime() : -Infinity; // No limit if startDate is not set
    const end = endDate ? new Date(endDate).getTime() : Infinity; // No limit if endDate is not set

    return partnershipDate >= start && partnershipDate <= end;
  });
};

// Filter by partnership value range
export const filterByPartnershipValue = (
  data: ContactsTableRowType[],
  lowerBound: number | null,
  upperBound: number | null
) => {
  return data.filter((row) => {
    const value = row.avg_partnership_value ? row.avg_partnership_value : 0;

    const lower = lowerBound !== null ? lowerBound : -Infinity; // No limit if lowerBound is not set
    const upper = upperBound !== null ? upperBound : Infinity; // No limit if upperBound is not set

    return value >= lower && value <= upper;
  });
};

// Filter by type (brand, agency, music)
export const filterByType = (
  data: ContactsTableRowType[],
  selectedTypes: string[]
) => {
  return data.filter((item) => selectedTypes.includes(item.type));
};

export const filterByNiches = (
  data: ContactsTableRowType[],
  selectedNiches: string[]
) => {
  return data.filter(
    (item) =>
      item.niches && item.niches.some((niche) => selectedNiches.includes(niche))
  );
};

export const filterTableRows = ({
  tableData,
  partnershipCountLowerBound,
  partnershipCountUpperBound,
  partnershipStartDate,
  partnershipEndDate,
  valueLowerBound,
  valueUpperBound,
  typeFilters = [],
  nichesFilters = [],
}: {
  tableData: ContactsTableRowType[];
} & ContactsFiltersType): ContactsTableRowType[] => {
  let filteredData = [...tableData];

  if (
    partnershipCountLowerBound !== undefined ||
    partnershipCountUpperBound !== undefined
  ) {
    filteredData = filterByNumPartnerships(
      filteredData,
      partnershipCountLowerBound,
      partnershipCountUpperBound
    );
  }

  if (partnershipStartDate || partnershipEndDate) {
    filteredData = filterByPartnershipDate(
      filteredData,
      partnershipStartDate,
      partnershipEndDate
    );
  }

  if (valueLowerBound !== undefined || valueUpperBound !== undefined) {
    filteredData = filterByPartnershipValue(
      filteredData,
      valueLowerBound,
      valueUpperBound
    );
  }

  if (typeFilters.length > 0) {
    filteredData = filterByType(filteredData, typeFilters);
  }

  if (nichesFilters.length > 0) {
    filteredData = filterByNiches(filteredData, nichesFilters);
  }

  return filteredData;
};

export const sortTableRows = (
  tableData: any[],
  sortBy: string,
  sortOrder: string
) => {
  const sortByLower = sortBy.toLowerCase();
  const typeOrder: Record<string, number> = {
    Brand: 1,
    Agency: 2,
    Music: 3,
  };

  if (sortByLower === "number of partnerships") {
    if (sortOrder === "Ascending") {
      return tableData.sort(
        (a, b) => a.num_of_partnerships - b.num_of_partnerships
      );
    }
    if (sortOrder === "Descending") {
      return tableData.sort(
        (a, b) => b.num_of_partnerships - a.num_of_partnerships
      );
    }
  }

  if (sortByLower === "average partnership value") {
    if (sortOrder === "Ascending") {
      return tableData.sort(
        (a, b) => a.avg_partnership_value - b.avg_partnership_value
      );
    }
    if (sortOrder === "Descending") {
      return tableData.sort(
        (a, b) => b.avg_partnership_value - a.avg_partnership_value
      );
    }
  }

  if (sortByLower === "last partnership date") {
    return tableData.sort((a, b) => {
      const dateA = new Date(a.last_partnership_date);
      const dateB = new Date(b.last_partnership_date);

      if (sortOrder === "Ascending") {
        return dateA.getTime() - dateB.getTime();
      } else {
        return dateB.getTime() - dateA.getTime();
      }
    });
  }

  if (sortByLower === "type") {
    if (sortOrder === "Ascending") {
      return tableData.sort((a, b) => {
        return typeOrder[a.type] - typeOrder[b.type];
      });
    }
    if (sortOrder === "Descending") {
      return tableData.sort((a, b) => {
        return typeOrder[b.type] - typeOrder[a.type];
      });
    }
  }

  if (sortBy === "Date Rejected") {
    return tableData.sort((a, b) => {
      const dateA = new Date(a.date_rejected);
      const dateB = new Date(b.date_rejected);

      if (sortOrder === "Ascending") {
        return dateA.getTime() - dateB.getTime();
      } else {
        return dateB.getTime() - dateA.getTime();
      }
    });
  }

  return tableData;
};

export const applyFiltersAndSort = ({
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
}: ContactFilterFunctionParamsType): void => {
  // Filter data based on search input
  let filteredData = tableData.filter(({ name, brand, contact_info }) => {
    const searchLower = search.toLowerCase();
    return (
      name?.toLowerCase().includes(searchLower) ||
      brand?.toLowerCase().includes(searchLower) ||
      contact_info.email.toLowerCase().includes(searchLower)
    );
  });

  if (
    partnershipStartDate !== null ||
    partnershipEndDate !== null ||
    valueLowerBound !== null ||
    valueUpperBound !== null ||
    partnershipCountLowerBound !== null ||
    partnershipCountUpperBound !== null ||
    typeFilters.length !== 0 ||
    nichesFilters.length !== 0
  ) {
    // Apply your custom filter logic here
    filteredData = filterTableRows({
      tableData: filteredData,
      partnershipStartDate,
      partnershipEndDate,
      valueLowerBound,
      valueUpperBound,
      partnershipCountLowerBound,
      partnershipCountUpperBound,
      typeFilters,
      nichesFilters,
    });
  }

  // Apply sort logic here if sortBy is active
  if (sortBy) {
    filteredData = sortTableRows(filteredData, sortBy, sortOrder); // Assuming `sortTableRows` is defined elsewhere
  }

  // Set the filtered and sorted data
  setFilteredTableData(filteredData);
};
