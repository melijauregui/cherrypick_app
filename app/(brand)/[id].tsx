import React from "react";
import { useLocalSearchParams } from "expo-router";
import { BrandProfilePage } from "@/app/components/profile/brandProfile";

const BrandProfile = () => {
  const params = useLocalSearchParams();
  const brandId = params.id as string;
  return <BrandProfilePage brandId={brandId} />;
};

export default BrandProfile;
