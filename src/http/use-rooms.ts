import { useQuery } from "@tanstack/react-query";
import type { GetRoomsResponse } from "./types/get-rooms-response";

export function useRooms(userId: string) {
  return useQuery({
    queryKey: ["get-rooms", userId],
    queryFn: async () => {
      const token = sessionStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found");
      }

      const response = await fetch(`http://localhost:3333/rooms/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result: GetRoomsResponse = await response.json();

      return result;
    },
  });
}
