import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const loginSchema = z.object({
  email: z.email('E-mail inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
});

interface loginResponse {
  userId: string;
  name: string;
  role: string;
  token: string;
}

type LoginSchema = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: LoginSchema) => {
    setIsLoading(true);
    const response = await fetch('http://localhost:3333/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    const data: loginResponse = await response.json();
    if (response.ok) {
      sessionStorage.setItem('token', data.token);
      navigate('/create-room', {
        state: { userId: data.userId },
      });
    }
    form.reset();
    setIsLoading(false);
  };

  return (
    <section className="flex h-screen items-center justify-center">
      <Card className="mx-auto my-auto w-full max-w-md border border-muted shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Entrar</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <Input
                      placeholder="seu@email.com"
                      type="email"
                      {...field}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <Input placeholder="••••••••" type="password" {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button className="w-full" type="submit">
                {isLoading ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  'Entrar'
                )}
              </Button>
              <p className="mt-4 text-center text-muted-foreground text-sm">
                Não tem uma conta?{' '}
                <Link className="text-blue-500 hover:underline" to="/register">
                  Registre-se
                </Link>
              </p>
            </form>
          </Form>
        </CardContent>
      </Card>
    </section>
  );
}
