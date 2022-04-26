import { useEffect, useRef, useState } from 'react';
import { PrimeFile } from '../interfaces/ui/primereact/primeFile';

interface Props {
    name: string,
    type?: string
    url?: string,
}

async function getFileFromUrl(url: string, name: string, defaultType = 'image/jpeg') {
  const response = await fetch(url);
  if (response.status === 200 && url) {
    const data = await response.blob();
    return new File([ data ], name, {
      type: data.type || defaultType,
    });
  }
  throw new Error('File not found');
}

export const useFile = ({ url, name, type = 'image/jpeg' }: Props) => {
  const [ file, setFile ] = useState<PrimeFile>();
  const [ objectUrl, setObjectUrl ] = useState<string>();
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;

    const getFile = async () => {
      try {
        const data = await getFileFromUrl(url ?? '', name, type);

        const urlBlob = URL.createObjectURL(data);
        if (mounted) {
          setObjectUrl(urlBlob);
          setFile(Object.assign(data, { objectURL: urlBlob }));
        }
      } catch (error) {
        if (mounted) {
          setFile(undefined);
        }
      }
    };
    getFile();
  }, [ url ]);

  useEffect(() => () => {
    mounted.current = false;
    if (objectUrl) {
      URL.revokeObjectURL(objectUrl);
    }
  }, []);

  return {
    file,
    setFile,
  };
};

export default useFile;
