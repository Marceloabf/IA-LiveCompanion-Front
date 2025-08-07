import { ArrowLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { AudioUploader } from '@/components/audio-uploader';
import type { RoomParams } from './types/room-params';

export function UploadAudio() {
  const params = useParams<RoomParams>();

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-3">
      {params.roomId && <AudioUploader roomId={params.roomId} />}
      <Link className="flex gap-2 align-middle" to={`/room/${params.roomId}`}>
        <ArrowLeft /> Retornar
      </Link>
    </div>
  );
}
