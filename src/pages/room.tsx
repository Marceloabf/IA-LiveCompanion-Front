import { ArrowLeft, Radio, Upload } from 'lucide-react';
import { Link, Navigate, useLocation, useParams } from 'react-router-dom';
import { QuestionForm } from '@/components/question-form';
import { QuestionList } from '@/components/question-list';
import { Sidebar } from '@/components/sidebar';
import { Button } from '@/components/ui/button';

type RoomParams = {
  roomId: string;
};

export function Room() {
  const location = useLocation();
  const userId = location.state?.userId;

  const params = useParams<RoomParams>();

  if (!params.roomId) {
    return <Navigate replace to="/" />;
  }

  return (
    <div className="container flex min-h-screen bg-zinc-950">
      <Sidebar
        userEmail={location.state?.userEmail}
        userId={userId}
        userName={location.state?.userName}
      />
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <Link
              state={{
                userId,
                userName: location.state?.userName,
                userEmail: location.state?.userEmail,
              }}
              to="/create-room"
            >
              <Button variant="outline">
                <ArrowLeft className="size-4" />
                Voltar
              </Button>
            </Link>
            <div className="audio-buttons-container flex gap-2">
              <Link
                state={{
                  userId,
                  userName: location.state?.userName,
                  userEmail: location.state?.userEmail,
                }}
                to={`/room/${params.roomId}/upload-audio`}
              >
                <Button className="flex items-center gap-2" variant="secondary">
                  <Upload className="size-4" />
                  Upload de Áudio
                </Button>
              </Link>
              <Link
                state={{
                  userId,
                  userName: location.state?.userName,
                  userEmail: location.state?.userEmail,
                }}
                to={`/room/${params.roomId}/audio`}
              >
                <Button className="flex items-center gap-2" variant="secondary">
                  <Radio className="size-4" />
                  Gravar Áudio
                </Button>
              </Link>
            </div>
          </div>
          <h1 className="mb-2 font-bold text-3xl text-foreground">
            Sala de Perguntas
          </h1>
          <p className="text-muted-foreground">
            Faça perguntas e receba respostas com IA
          </p>
        </div>

        <div className="mb-8">
          <QuestionForm roomId={params.roomId} userId={userId} />
        </div>

        <QuestionList roomId={params.roomId} />
      </div>
    </div>
  );
}
