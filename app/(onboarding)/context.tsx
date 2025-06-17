import { createContext, useContext } from "react";

export const OnboardingContext = createContext({
  tempMnemonic: "",
});

export const useOnboardingContext = () => {
  return useContext(OnboardingContext);
};
