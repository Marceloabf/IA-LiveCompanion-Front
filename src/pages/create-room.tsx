import { ArrowLeft } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { CreateRoomForm } from '@/components/create-room-form';
import { RoomList } from '@/components/room-list';
import { Button } from '@/components/ui/button';

export function CreateRoom() {
  const location = useLocation();
  const userId = location.state?.userId;

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <div className="grid grid-cols-2 items-start gap-8">
          <div>
            <CreateRoomForm userId={userId} />
            <Link className="mt-4 block" to="/">
              <Button variant="outline">
                <ArrowLeft className="mr-2 size-4" />
                Voltar ao Início
              </Button>
            </Link>
          </div>
          <RoomList userId={userId} />
          <div />
        </div>
      </div>
    </div>
  );
}
