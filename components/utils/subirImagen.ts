import mime from 'mime';

export const getFileData = (uri: string) => {
  const extension = uri.split('.').pop() || 'jpg';
  const name = `${Date.now()}.${extension}`;
  const type = mime.getType(uri) || 'image/jpeg';

  return { uri, name, type };
};
