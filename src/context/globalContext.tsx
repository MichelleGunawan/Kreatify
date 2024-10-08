"use client";
import { UserPermissionType } from "@/types/enum.types";
import { convertToUUID } from "@/utils/functions/converter.functions";
import { UUID } from "crypto";
import React, { useState, ReactNode } from "react";

interface IGlobalContextProps {
  user: any;
  firstName: string;
  lastName: string;
  userId: UUID | null;
  talentId: UUID | null;
  managerId: UUID | null;
  agencyId: UUID | null;
  userPermission: UserPermissionType | null;
  loading: boolean;
  setUser: (user: any) => void;
  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
  setUserId: (userId: UUID) => void;
  setTalentId: (talentId: UUID | null) => void;
  setManagerId: (managerId: UUID | null) => void;
  setAgencyId: (agencyId: UUID | null) => void;
  setUserPermission: (userPermission: UserPermissionType | null) => void;
  setLoading: (loading: boolean) => void;
}

export const GlobalContext = React.createContext<IGlobalContextProps>({
  user: {},
  firstName: "",
  lastName: "",
  userId: null,
  talentId: null,
  managerId: null,
  agencyId: null,
  userPermission: null,
  loading: true,
  setUser: () => {},
  setFirstName: () => {},
  setLastName: () => {},
  setUserId: () => {},
  setTalentId: () => {},
  setManagerId: () => {},
  setAgencyId: () => {},
  setUserPermission: () => {},
  setLoading: () => {},
});

export const GlobalContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [currentUser, setCurrentUser] = useState({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("Donut");
  const [userId, setUserId] = useState<UUID | null>(null); // TODO: maybe set user id to talent id or manager id
  const [talentId, setTalentId] = useState<UUID | null>(null);
  const [managerId, setManagerId] = useState<UUID | null>(null);
  const [agencyId, setAgencyId] = useState<UUID | null>(null);
  const [userPermission, setUserPermission] =
    useState<UserPermissionType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <GlobalContext.Provider
      value={{
        user: currentUser,
        firstName,
        lastName,
        userId: convertToUUID(userId),
        talentId: convertToUUID(talentId),
        managerId: convertToUUID(managerId),
        agencyId: convertToUUID(agencyId),
        userPermission: userPermission ? userPermission : null,
        loading: isLoading,
        setUser: setCurrentUser,
        setFirstName: setFirstName,
        setLastName: setLastName,
        setUserId: setUserId,
        setTalentId: setTalentId,
        setManagerId: setManagerId,
        setAgencyId: setAgencyId,
        setUserPermission: setUserPermission,
        setLoading: setIsLoading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
