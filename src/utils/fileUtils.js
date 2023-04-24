const calculateFileSize = (sizeInBytes) => {
  const units = ["B", "KB", "MB", "GB", "TB"];
  let index = 0;
  let size = sizeInBytes;
  while (size >= 1024) {
    size /= 1024;
    index++;
  }
  return `${size.toFixed(1)} ${units[index]}`;
};
export { calculateFileSize };
