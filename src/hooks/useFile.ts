import { useEffect, useState } from 'react';

import { PrimeFile } from '../interfaces/ui/primereact/primeFileInterface';

interface Props {
    name: string,
    type?: string
    url?: string,
}

const getFileFromUrl = async (url: string, name: string, defaultType = 'image/jpeg') => {
  const response = await fetch(url);
  if (response.status === 200 && url) {
    const data = await response.blob();
    return new File([ data ], name, {
      type: data.type || defaultType,
    });
  }
  throw new Error('File not found');
};

export const useFile = ({ url, name, type = 'image/jpeg' }: Props) => {
  const [ file, setFile ] = useState<PrimeFile>();
  const [ objectUrl, setObjectUrl ] = useState<string>();

  useEffect(() => {
    const getFile = async () => {
      try {
        const data = await getFileFromUrl(url ?? '', name, type);

        const urlBlob = URL.createObjectURL(data);

        setObjectUrl(urlBlob);
        setFile(Object.assign(data, { objectURL: urlBlob }));
      } catch (error) {
        setFile(undefined);
      }
    };
    getFile();
  }, [ name, type, url ]);

  useEffect(() => () => {
    if (objectUrl) {
      URL.revokeObjectURL(objectUrl);
    }
  }, [ objectUrl ]);

  return {
    file,
    setFile,
  };
};

export default useFile;
