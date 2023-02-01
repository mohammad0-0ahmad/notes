import { createContext, useContext } from "react";
import useFetch from "use-http";
import Progress from "../components/Progress";
import { UserSchema } from "db/models/user";

const ProfileContext = createContext(null);

const ProfileProvider: FCWC = ({ children }) => {
  const { loading, data } = useFetch("/api/profile", []);

  return !loading ? (
    <ProfileContext.Provider value={data || {}}>{children}</ProfileContext.Provider>
  ) : (
    <Progress page />
  );
};

export default ProfileProvider;

export const useProfile: UseProfileType = () => useContext(ProfileContext);

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

type UseProfileType = () => Pick<UserSchema, "name" | "rights"> & {
  isAdmin: boolean;
};
