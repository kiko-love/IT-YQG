const calculateHotness = (viewCount, likeCount, downloadCount) => {
  const logView = Math.log10(viewCount);
  const logLike = Math.log10(likeCount + 1);
  const logDownload = Math.log10(downloadCount + 1);

  const hotness = logView * 0.3 + logLike * 0.4 + logDownload * 0.3;
  return Math.round(hotness*1000);
};

export { calculateHotness };
