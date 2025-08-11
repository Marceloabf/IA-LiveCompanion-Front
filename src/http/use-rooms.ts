import { useQuery } from "@tanstack/react-query";
import type { GetRoomsResponse } from "./types/get-rooms-response";

export function useRooms(userId: string) {
  return useQuery({
    queryKey: ["get-rooms", userId],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3333/rooms/${userId}`);
      const result: GetRoomsResponse = await response.json();

      return result;
    },
  });
}
