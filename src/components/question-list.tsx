import { useRoomsQuestions } from '@/http/use-room-questions';
import { QuestionItem } from './question-item';

interface RoomQuestionProps {
  roomId: string;
}

export function QuestionList(props: RoomQuestionProps) {
  const { data, isLoading } = useRoomsQuestions(props.roomId);
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-2xl text-foreground">
          Perguntas & Respostas
        </h2>
      </div>
      {isLoading && (
        <p className="text-muted-foreground text-sm">Carregando salas...</p>
      )}
      {data?.map((question) => {
        return <QuestionItem key={question.id} question={question} />;
      })}
    </div>
  );
}
