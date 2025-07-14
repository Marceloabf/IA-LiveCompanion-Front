import { Bot, Group, Mic } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export function Home() {
  return (
    <section className="flex h-screen flex-col items-center justify-center gap-8 px-8">
      <h1 className="mb-4 font-bold text-4xl">Bem-vindo ao Live Companion</h1>
      <p className="mb-6 w-100 text-center text-lg text-muted-foreground">
        Onde seus viewers nunca ficam com dúvidas. Crie uma sala, grave seu
        conteúdo e deixe a IA responder perguntas automaticamente para o seu
        público.
      </p>
      <Link to={'/create-room'}>
        <Button className="text-3x1">Começar</Button>
      </Link>
      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card>
          <CardContent className="flex flex-col items-center">
            <Group height={75} width={75} />
            <h3 className="mb-2 font-semibold text-xl">
              Crie salas personalizadas
            </h3>
            <p className="text-muted-foreground">
              Configure salas exclusivas para seus eventos, cursos ou
              transmissões.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-center">
            <Mic height={75} width={75} />
            <h3 className="mb-2 font-semibold text-xl">Grave seu conteúdo</h3>
            <p className="text-muted-foreground">
              Deixe sua mensagem registrada para que a IA possa usar como base
              ao responder.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-center">
            <Bot height={75} width={75} />
            <h3 className="mb-2 font-semibold text-xl">
              IA que responde por você
            </h3>
            <p className="text-muted-foreground">
              Seus viewers fazem perguntas e a IA responde com base no seu
              áudio, garantindo interação e engajamento.
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="mt-16 text-center">
        <h2 className="mb-4 font-bold text-3xl">
          Pronto para transformar a experiência dos seus viewers?
        </h2>
        <p className="mb-6 text-muted-foreground">
          Comece agora mesmo e deixe a IA cuidar das dúvidas do seu público.
        </p>
        <Link
          className="rounded-sm bg-primary px-4 text-primary-foreground shadow-xs hover:bg-primary/90"
          to={'/create-room'}
        >
          Começar
        </Link>
      </div>
    </section>
  );
}
