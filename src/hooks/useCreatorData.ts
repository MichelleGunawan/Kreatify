import { useState, useEffect } from "react";
import { UUID } from "crypto";
import { fetchTalentInfoWithAgencyID, fetchTalentInfoWithManagerID, TalentViewType } from "@/services/creator/creator_actions";

interface useCreatorDataProps {
    role: string;
    managerId?: UUID | null;
    agencyId?: UUID | null;
}

function useCreatorData(props: useCreatorDataProps) {
    const { role, managerId, agencyId } = props;

    const [myCreatorsData, setMyCreatorsData] = useState<any[]>([]);
    const [allCreatorsData, setAllCreatorsData] = useState<any[]>([]);

    useEffect(() => {
        if (role === "management" && managerId) {
            fetchTalentInfoWithManagerID(managerId).then(setMyCreatorsData);
        }
    }, [role, managerId]);

    useEffect(() => {
        if (role === "management" && agencyId) {
            fetchTalentInfoWithAgencyID(agencyId).then(setAllCreatorsData);
        }
    }, [role, agencyId]);

    return {
        myCreatorsData,
        allCreatorsData,
    };
}

export default useCreatorData;
