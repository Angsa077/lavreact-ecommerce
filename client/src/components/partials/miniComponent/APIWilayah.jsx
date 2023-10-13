import axios from 'axios';

const getProvinces = async () => {
    try {
        const response = await axios.get('https://angsa077.github.io/api-wilayah-indonesia/api/provinces.json');
        return response.data;
    } catch (error) {
        console.error('Error fetching provinces:', error);
    }
};

const getRegencies = async (provinceId) => {
    try {
        const response = await axios.get(`https://angsa077.github.io/api-wilayah-indonesia/api/regencies/${provinceId}.json`);
        return response.data;
    } catch (error) {
        console.error('Error fetching regencies:', error);
    }
};

const getDistricts = async (regencyId) => {
    try {
        const response = await axios.get(`https://angsa077.github.io/api-wilayah-indonesia/api/districts/${regencyId}.json`);
        return response.data;
    } catch (error) {
        console.error('Error fetching districts:', error);
    }
};

const getVillages = async (districtId) => {
    try {
        const response = await axios.get(`https://angsa077.github.io/api-wilayah-indonesia/api/villages/${districtId}.json`);
        return response.data;
    } catch (error) {
        console.error('Error fetching villages:', error);
    }
};

const getProvinceById = async (provinceId) => {
    try {
        const response = await axios.get(`https://angsa077.github.io/api-wilayah-indonesia/api/province/${provinceId}.json`);
        return response.data;
    } catch (error) {
        console.error('Error fetching province:', error);
        return null; // Return null to indicate an error occurred.
    }
};

const getRegencyById = async (regencyId) => {
    try {
        const response = await axios.get(`https://angsa077.github.io/api-wilayah-indonesia/api/regency/${regencyId}.json`);
        return response.data;
    } catch (error) {
        console.error('Error fetching regency:', error);
    }
};

const getDistrictById = async (districtId) => {
    try {
        const response = await axios.get(`https://angsa077.github.io/api-wilayah-indonesia/api/district/${districtId}.json`);
        return response.data;
    } catch (error) {
        console.error('Error fetching district:', error);
    }
};

const getVillageById = async (villageId) => {
    try {
        const response = await axios.get(`https://angsa077.github.io/api-wilayah-indonesia/api/village/${villageId}.json`);
        return response.data;
    } catch (error) {
        console.error('Error fetching village:', error);
    }
};


export { getProvinces, getRegencies, getDistricts, getVillages, getProvinceById, getRegencyById, getDistrictById, getVillageById };