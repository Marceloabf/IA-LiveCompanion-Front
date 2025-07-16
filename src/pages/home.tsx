import { Bot, Group, Mic } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export function Home() {
  return (
    <section className="flex h-screen flex-col items-center justify-center gap-8 px-8 pt-40 pb-8">
      <button
        className="rounded bg-gray-200 p-2 text-black dark:bg-gray-800 dark:text-white"
        onClick={() => {
          document.documentElement.classList.toggle('dark');
        }}
        type="button"
      >
        Toggle theme
      </button>
      <h1 className="mb-4 font-bold text-4xl">Bem-vindo ao Live Companion</h1>
      <p className="mb-6 w-100 text-center text-lg text-muted-foreground">
        Crie uma sala, grave seu conteúdo e deixe a IA responder perguntas
        automaticamente para o seu público.
      </p>
      <Link to={'/create-room'}>
        <Button className="text-2xl text-black shadow-[0_6px_20px_rgba(0,0,0,0.6)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]">
          Iniciar
        </Button>
      </Link>
      <div className="my-12 grid h-full grid-cols-1 gap-6 md:grid-cols-3">
        <Card>
          <CardContent className="flex flex-col items-center">
            <Group height={75} width={75} />
            <h3 className="my-5 font-semibold text-xl">
              Crie salas personalizadas
            </h3>
            <p className="text-center text-muted-foreground">
              Monte salas exclusivas para suas lives, cursos ou eventos. Ofereça
              uma experiência única e interativa para o seu público, tudo de
              forma simples e rápida.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-center">
            <Mic height={75} width={75} />
            <h3 className="my-5 font-semibold text-xl">Grave seu conteúdo</h3>
            <p className="text-center text-muted-foreground">
              Grave suas ideias, aulas, workshops ou até mesmo crie seu próprio
              audiobook. Tenha seu conteúdo sempre disponível para consultas.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-center">
            <Bot height={75} width={75} />
            <h3 className="my-5 font-semibold text-xl">
              IA que responde por você
            </h3>
            <p className="text-center text-muted-foreground">
              Economize tempo enquanto a IA cuida das perguntas do seu público.
              Continue apresentando sem interrupções, sabendo que as dúvidas
              estão sendo respondidas com base no que você falou.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
