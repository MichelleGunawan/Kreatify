import { useState, useEffect } from "react";
import { UUID } from "crypto";
import { fetchTalentInfoWithManagerID, fetchTalentInfoWithAgencyID } from "@/services/creator/creator_actions";

interface useInfluencerDataProps {
    role: string;
    managerId?: UUID | null;
    agencyId?: UUID | null;
}

function useInfluencerData(props: useInfluencerDataProps) {
    const { role, managerId, agencyId } = props;

    const [myInfluencersData, setMyInfluencersData] = useState<any[]>([]);
    const [allInfluencersData, setAllInfluencersData] = useState<any[]>([]);

    useEffect(() => {
        if (role === "management" && managerId) {
            fetchTalentInfoWithManagerID(managerId).then(setMyInfluencersData);
        }
    }, [role, managerId]);

    useEffect(() => {
        if (role === "management" && agencyId) {
            fetchTalentInfoWithAgencyID(agencyId).then(setAllInfluencersData);
        }
    }, [role, agencyId]);

    return {
        myInfluencersData,
        allInfluencersData,
    };
}

export default useInfluencerData;
