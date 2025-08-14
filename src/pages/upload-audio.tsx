import { ArrowLeft } from 'lucide-react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { AudioUploader } from '@/components/audio-uploader';
import { Sidebar } from '@/components/sidebar';
import { Button } from '@/components/ui/button';
import type { RoomParams } from './types/room-params';

export function UploadAudio() {
  const location = useLocation();
  const userId = location.state?.userId;
  const params = useParams<RoomParams>();

  return (
    <div className="container flex h-screen">
      <Sidebar
        userEmail={location.state?.userEmail}
        userId={userId}
        userName={location.state?.userName}
      />
      <div className="flex w-full flex-col items-center justify-center gap-4">
        {params.roomId && (
          <AudioUploader roomId={params.roomId} userId={userId} />
        )}
        <Link
          state={{
            userId,
            userName: location.state?.userName,
            userEmail: location.state?.userEmail,
          }}
          to={`/room/${params.roomId}`}
        >
          <Button variant="outline">
            <ArrowLeft className="size-4" />
            Voltar
          </Button>
        </Link>
      </div>
    </div>
  );
}
