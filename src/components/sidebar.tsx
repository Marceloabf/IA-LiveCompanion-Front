import {
  ChevronLeft,
  ChevronRight,
  Home,
  LogOut,
  MessageSquare,
  Settings,
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import type { sharedState } from '@/http/types/shared-state';
import { Button } from './ui/button';

export function Sidebar({ userName, userEmail, userId }: sharedState) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={`fixed flex h-screen flex-col border-r bg-background py-4 transition-all duration-300 ${
        collapsed ? 'w-18' : 'w-64'
      }`}
    >
      {/* Header */}
      <div className="flex items-center gap-3 border-b p-4">
        {!collapsed && (
          <>
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
          </>
        )}
        <Button
          className="rounded-full border p-1 shadow hover:bg-accent"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </Button>
      </div>

      <Separator />

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between">
        <ScrollArea>
          <nav className="flex flex-col gap-1 p-4">
            <Link
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
              state={{ userId, userName, userEmail }}
              to="/create-room"
            >
              <Home className="h-4 w-4" /> {!collapsed && 'Início'}
            </Link>
            <Link
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
              to="/perguntas"
            >
              <MessageSquare className="h-4 w-4" />{' '}
              {!collapsed && 'Minhas Perguntas'}
            </Link>
            <Link
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
              to="/configuracoes"
            >
              <Settings className="h-4 w-4" /> {!collapsed && 'Configurações'}
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
              <LogOut className="mr-2 h-4 w-4" /> {!collapsed && 'Logout'}
            </Link>
          </nav>
        </ScrollArea>
      </div>

      {/* Footer */}
      {!collapsed && (
        <div className="border-t p-4 text-center text-muted-foreground text-sm">
          © 2025 Let Me Ask
        </div>
      )}
    </div>
  );
}
