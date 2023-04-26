const calculateHotness = (viewCount, likeCount, downloadCount) => {
  if (viewCount <= 0 || likeCount <= 0 || downloadCount <= 0) {
    return 0;
  }
  const logView = Math.log10(viewCount);
  const logLike = Math.log10(likeCount + 1);
  const logDownload = Math.log10(downloadCount + 1);

  const hotness = logView * 0.3 + logLike * 0.4 + logDownload * 0.3;
  // 修正 hotness 的值
  const adjustedHotness = isFinite(hotness) ? hotness : hotness > 0 ? 1 : -1;
  return Math.round(adjustedHotness * 1000);
};

export { calculateHotness };
