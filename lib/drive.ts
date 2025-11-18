// export const getGoogleDriveImageUrl = (url: string) => {
//   const fileId = url.match(/[-\w]{25,}/)?.[0];
//   return fileId 
//     ? `https://drive.google.com/uc?id=${fileId}`
//     : url;
// };


export const getGoogleDriveImageUrl = (url: string): string => {
  const id = url.match(/[-\w]{25,}/)?.[0];
  return id
    ? `https://drive.usercontent.google.com/download?id=${id}`
    : url;
};
