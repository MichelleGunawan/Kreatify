import {
  CampaignsFilterParamsType,
  CampaignsFiltersType,
} from "@/types/table.type";

export const filterTableRows = ({
  tableData,
  talentManagerFilters,
  campaignManagerFilters,
  influencerFilters,
  paymentStatusFilters,
  categoryFilters,
}: CampaignsFiltersType & { tableData: any[] }) => {
  const filteredTableData = tableData.filter((row) => {
    // Initialize filters with default true
    let talentManagerFilter = true;
    let campaignManagerFilter = true;
    let influencerFilter = true;
    let categoryFiltersFilter = true;
    let paymentStatusFiltersFilter = true;

    // Talent Manager Filter
    if (talentManagerFilters.length > 0 && row?.talent_manager) {
      talentManagerFilter = talentManagerFilters.includes(
        row.talent_manager.id
      );
    }

    // Campaign Manager Filter
    if (campaignManagerFilters.length > 0 && row?.campaign_manager) {
      campaignManagerFilter = campaignManagerFilters.includes(
        row.campaign_manager.id
      );
    }

    // Influencer Filter
    if (influencerFilters.length > 0 && row?.influencer) {
      influencerFilter = influencerFilters.includes(row.influencer.id);
    }

    // Category Filters
    if (categoryFilters.length > 0 && row?.category) {
      categoryFiltersFilter = categoryFilters.includes(row.category);
    }

    // Payment Status Filter
    if (paymentStatusFilters.length > 0 && row?.payment_status) {
      paymentStatusFiltersFilter = paymentStatusFilters.includes(
        row.payment_status
      );
    }

    // Combine all filters
    const isRowValid =
      talentManagerFilter &&
      campaignManagerFilter &&
      influencerFilter &&
      categoryFiltersFilter &&
      paymentStatusFiltersFilter;

    return isRowValid;
  });

  return filteredTableData;
};

export const sortTableRows = (
  tableData: any[],
  sortBy: string,
  sortOrder: string
) => {
  const paymentStatusFiltersOrder: Record<string, number> = {
    Pending: 1,
    "Agency Paid": 2,
    "Manager Paid": 3,
    "Influencer Paid": 4,
  };

  if (sortBy === "Name") {
    return tableData.sort((a, b) => {
      if (sortOrder === "Ascending") {
        return a.campaign_name.localeCompare(b.campaign_name);
      } else {
        return b.campaign_name.localeCompare(a.campaign_name);
      }
    });
  }

  if (sortBy === "Campaign Rate") {
    if (sortOrder === "Ascending") {
      return tableData.sort((a, b) => a.campaign_rate - b.campaign_rate);
    }
    if (sortOrder === "Descending") {
      return tableData.sort((a, b) => b.campaign_rate - a.campaign_rate);
    }
  }

  if (sortBy === "My Payout") {
    if (sortOrder === "Ascending") {
      return tableData.sort((a, b) => a.influencer_rate - b.influencer_rate);
    }
    if (sortOrder === "Descending") {
      return tableData.sort((a, b) => b.influencer_rate - a.influencer_rate);
    }
  }

  if (sortBy === "Confirm By") {
    return tableData.sort((a, b) => {
      const dateA = new Date(a.confirm_by);
      const dateB = new Date(b.confirm_by);

      if (sortOrder === "Ascending") {
        return dateA.getTime() - dateB.getTime();
      } else {
        return dateB.getTime() - dateA.getTime();
      }
    });
  }

  if (sortBy === "Next Milestone") {
    return tableData.sort((a, b) => {
      const dateA = new Date(a.next_milestone);
      const dateB = new Date(b.next_milestone);

      if (sortOrder === "Ascending") {
        return dateA.getTime() - dateB.getTime();
      } else {
        return dateB.getTime() - dateA.getTime();
      }
    });
  }

  if (sortBy === "Progress") {
    if (sortOrder === "Ascending") {
      return tableData.sort((a, b) => {
        const progressA = a.campaign_progress;
        const progressB = b.campaign_progress;
        return progressA - progressB;
      });
    }
    if (sortOrder === "Descending") {
      return tableData.sort((a, b) => {
        const progressA = a.campaign_progress;
        const progressB = b.campaign_progress;
        return progressB - progressA;
      });
    }
  }

  if (sortBy === "Payment Status") {
    if (sortOrder === "Ascending") {
      return tableData.sort((a, b) => {
        return (
          paymentStatusFiltersOrder[a.payment_status] -
          paymentStatusFiltersOrder[b.payment_status]
        );
      });
    }
    if (sortOrder === "Descending") {
      return tableData.sort((a, b) => {
        return (
          paymentStatusFiltersOrder[b.payment_status] -
          paymentStatusFiltersOrder[a.payment_status]
        );
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
  talentManagerFilters,
  campaignManagerFilters,
  influencerFilters,
  paymentStatusFilters,
  categoryFilters,
  sortBy,
  sortOrder,
}: CampaignsFilterParamsType): void => {
  const searchLower = search?.toLowerCase() || "";

  // Search
  let filteredData = tableData.filter(
    ({ campaign_name, brand, contact_info, talent_manager, influencer }) => {
      const brandName = brand?.brand_name?.toLowerCase() || "";
      const contactEmail = contact_info?.email?.toLowerCase() || "";
      const talentManagerName = talent_manager?.name?.toLowerCase() || "";
      const influencerName = influencer?.name?.toLowerCase() || "";

      return (
        campaign_name?.toLowerCase()?.includes(searchLower) ||
        brandName.includes(searchLower) ||
        contactEmail.includes(searchLower) ||
        talentManagerName.includes(searchLower) ||
        influencerName.includes(searchLower)
      );
    }
  );

  // Filter
  if (
    talentManagerFilters?.length ||
    campaignManagerFilters?.length ||
    influencerFilters?.length ||
    paymentStatusFilters?.length ||
    categoryFilters?.length
  ) {
    filteredData = filterTableRows({
      tableData: filteredData,
      talentManagerFilters,
      campaignManagerFilters,
      influencerFilters,
      paymentStatusFilters,
      categoryFilters,
    });
  }

  // Sort
  if (sortBy) {
    filteredData = sortTableRows(filteredData, sortBy, sortOrder);
  }

  setFilteredTableData(filteredData);
};
