import { useEffect, useRef, useState } from 'react';
import { PrimeFile } from '../interfaces/ui/primereact/primeFile';

interface Props {
    url: string,
    name: string,
    type?: string
}

async function getFileFromUrl(url: string, name: string, defaultType = 'image/jpeg') {
  const response = await fetch(url);
  const data = await response.blob();
  return new File([ data ], name, {
    type: data.type || defaultType,
  });
}

export const useFile = ({ url, name, type = 'image/jpeg' }: Props) => {
  const mounted = useRef(false);
  const [ objectUrl, setObjectUrl ] = useState<string>();
  const [ file, setFile ] = useState<PrimeFile>();

  useEffect(() => {
    mounted.current = true;
    if (url) {
      const getFile = async () => {
        const data = await getFileFromUrl(url ?? '', name, type);
        const urlBlob = URL.createObjectURL(data);
        if (mounted) {
          setObjectUrl(urlBlob);
          setFile(Object.assign(data, { objectURL: urlBlob }));
        }
      };
      getFile();
    }
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
