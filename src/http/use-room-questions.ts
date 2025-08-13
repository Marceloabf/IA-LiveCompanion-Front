import { useQuery } from "@tanstack/react-query";
import type { GetRoomQuestionsResponse } from "./types/get-room-questions-response";

export function useRoomsQuestions(roomId: string) {
  return useQuery({
    queryKey: ["get-questions", roomId],
    queryFn: async () => {
      const token = sessionStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found");
      }
      const response = await fetch(
        `http://localhost:3333/rooms/${roomId}/questions`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result: GetRoomQuestionsResponse = await response.json();

      return result;
    },
  });
}
