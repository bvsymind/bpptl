// export const getGoogleDriveImageUrl = (url: string): string => {
//   const id = url.match(/[-\w]{25,}/)?.[0];
//   return id
//     ? `https://drive.usercontent.google.com/download?id=${id}`
//     : url;
// };


const extractDriveId = (url: string): string | null => {
  return url.match(/[-\w]{25,}/)?.[0] ?? null;
};

export const getGoogleDriveImageUrl = (url: string): string => {
  const id = extractDriveId(url);
  return id
    ? `https://drive.usercontent.google.com/download?id=${id}`
    : url;
};

export const getGoogleDriveDownloadUrl = (url: string): string => {
  const id = extractDriveId(url);
  return id
    ? `https://drive.usercontent.google.com/download?id=${id}&export=download&authuser=0`
    : url;
};

export const getGoogleDriveViewUrl = (url: string): string => {
  const id = extractDriveId(url);
  return id
    ? `https://drive.google.com/file/d/${id}/view`
    : url;
};
