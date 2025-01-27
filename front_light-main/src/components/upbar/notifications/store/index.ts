import { io, Socket } from 'socket.io-client';
import { useGlobalContext } from '@/Context';
import { useMemo } from 'react';

const socketURL = `https://dev.api.dakaai.io/notification`;

const useSocket = (): Socket | undefined => {
  const { accessToken } = useGlobalContext();

  const socket = useMemo(() => {
    console.log('accessToken', accessToken);
    if (accessToken) {
      return io(socketURL, {
        // auth: {
        //   token: accessToken,
        // },
      });
    }
  }, [accessToken]);

  return socket;
};

export default useSocket;