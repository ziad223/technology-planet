"use server";

import apiServiceCall from "./apiServiceCall";


export const getHome = async (lang: string) => {
  return apiServiceCall({
    url: `home`,
    headers: { "Accept-Language": lang },
  });
};
export const getAboutUs = async (lang: string) => {
  return apiServiceCall({
    url: `aboutus`,
    headers: { "Accept-Language": lang },
  });
};

export const getSettings = async (lang: string) => {
  return apiServiceCall({
    url: `settings`,
    headers: { "Accept-Language": lang },
  });
};



export const getBlogDetails = async (lang: string , id : string) => {
  return apiServiceCall({
    url: `blogs/${id}`,
    headers: { "Accept-Language": lang },
  });
};

export const getAbout = async (lang: string) => {
  return apiServiceCall({
    url: `about-us`,
    headers: { "Accept-Language": lang },
  });
};

export const getPrice = async (lang: string) => {
  return apiServiceCall({
    url: `our-prices`,
    headers: { "Accept-Language": lang },
  });
};

export const getSectorsDetails= async (lang: string , id : string) => {
  return apiServiceCall({
    url: `sectors/${id}`,
    headers: { "Accept-Language": lang },
  });
};


export const getServices = async (lang: string) => {
  return apiServiceCall({
    url: `services`,
    headers: { "Accept-Language": lang },
  });
};


export const getOurServices = async (lang: string) => {
  return apiServiceCall({
    url: `our-services`,
    headers: { "Accept-Language": lang },
  });
};


export const getBlogs = async (lang: string) => {
  return apiServiceCall({
    url: `blogs`,
    headers: { "Accept-Language": lang },
  });
};

export const getPartners = async (lang: string) => {
  return apiServiceCall({
    url: `partners`,
    headers: { "Accept-Language": lang },
  });
};

export const getRegisters = async (lang: string) => {
  return apiServiceCall({
    url: `registered-wuth-us`,
    headers: { "Accept-Language": lang },
  });
};