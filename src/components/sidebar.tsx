import { Home, LogOut, MessageSquare, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

export interface SidebarProps {
  userName: string;
  userEmail: string;
}

export function Sidebar({ userName, userEmail }: SidebarProps) {
  return (
    <div className="flex h-screen w-64 flex-col border-r bg-background py-4">
      {/* Header */}
      <div className="flex items-center gap-3 border-b p-4">
        <Avatar>
          <AvatarImage alt="@usuario" src="/avatar.jpg" />
          <AvatarFallback>AB</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-medium">{userName ?? ''}</span>
          <span className="text-muted-foreground text-xs">
            {userEmail ?? ''}
          </span>
        </div>
      </div>
      <Separator />
      <div className="flex flex-1 flex-col justify-between">
        <ScrollArea>
          <nav className="flex flex-col gap-1 p-4">
            <Link
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
              to="/"
            >
              <Home className="h-4 w-4" /> Início
            </Link>
            <Link
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
              to="/perguntas"
            >
              <MessageSquare className="h-4 w-4" /> Minhas Perguntas
            </Link>
            <Link
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
              to="/configuracoes"
            >
              <Settings className="h-4 w-4" /> Configurações
            </Link>
          </nav>
        </ScrollArea>
        <ScrollArea>
          <nav className="flex flex-col gap-1 p-4">
            <Link
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
              onClick={() => sessionStorage.removeItem('token')}
              to="/"
            >
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </Link>
          </nav>
        </ScrollArea>
      </div>

      {/* Footer */}
      <div className="border-t p-4 text-center text-muted-foreground text-sm">
        © 2025 Let Me Ask
      </div>
    </div>
  );
}
