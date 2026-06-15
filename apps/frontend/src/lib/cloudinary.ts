// Configuration Cloudinary
export const cloudinaryConfig = {
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || '',
};

export const getCloudinaryUrl = (publicId: string, options?: any) => {
  const baseUrl = `https://res.cloudinary.com/${cloudinaryConfig.cloudName}/image/upload`;
  const transformations = [
    'f_auto', // Format auto
    'q_auto', // Quality auto
    'w_auto', // Width auto
    ...(options?.width ? [`w_${options.width}`] : []),
    ...(options?.height ? [`h_${options.height}`] : []),
  ];

  return `${baseUrl}/${transformations.join('/')}/v1/${publicId}`;
};
