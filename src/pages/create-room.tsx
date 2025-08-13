import { useLocation } from 'react-router-dom';
import { CreateRoomForm } from '@/components/create-room-form';
import { RoomList } from '@/components/room-list';
import { Sidebar } from '@/components/sidebar';

export function CreateRoom() {
  const location = useLocation();
  const userId = location.state?.userId;
  return (
    <div className="container flex">
      <Sidebar
        userEmail={location.state?.email}
        userName={location.state?.name}
      />
      <div className="min-h-screen w-full px-4 py-8">
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-4">
          <div>
            <CreateRoomForm userId={userId} />
          </div>
          <RoomList userId={userId} />
          <div />
        </div>
      </div>
    </div>
  );
}
