import { useLocation } from 'react-router-dom';
import { CreateRoomForm } from '@/components/create-room-form';
import { RoomList } from '@/components/room-list';
import { Sidebar } from '@/components/sidebar';

export function CreateRoom() {
  const location = useLocation();

  return (
    <div className="container flex">
      <Sidebar
        userEmail={location.state?.userEmail}
        userId={location.state?.userId}
        userName={location.state?.userName}
      />
      <div className="min-h-screen w-full px-4 py-8">
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-4">
          <div>
            <CreateRoomForm userId={location.state?.userId} />
          </div>
          <RoomList
            userEmail={location.state?.userEmail}
            userId={location.state?.userId}
            userName={location.state?.userName}
          />
          <div />
        </div>
      </div>
    </div>
  );
}
