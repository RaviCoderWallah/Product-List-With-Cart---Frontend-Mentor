// utils/fetchData.js
export const fetchingProductData = async (dataSrc) => {
  try {
    if (typeof dataSrc === "string") {
      const response = await fetch(dataSrc);
      const data = await response.json();
      return data;
    } else {
      return dataSrc;
    }
  } catch (err) {
    console.error("❌ Error:", err);
  }
};
