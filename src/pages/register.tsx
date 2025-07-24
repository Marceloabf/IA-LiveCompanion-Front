import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const registerSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.email('E-mail inválido'),
  password: z.string().min(8, 'A senha precisa ter pelo menos 8 caracteres'),
  key: z.string().optional(),
  role: z.enum(['user', 'teacher']),
});

type RegisterSchema = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      key: '',
      role: 'user',
    },
  });

  const onSubmit = (values: RegisterSchema) => {
    // biome-ignore lint/suspicious/noConsole: <test api>
    console.log('Register:', values);
    // Chamada da API de register
  };

  return (
    <section className="flex h-screen items-center justify-center">
      <Card className="mx-auto w-full max-w-md border border-muted shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Registrar</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <Input placeholder="Nome e sobrenome" {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />

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

              <FormField
                control={form.control}
                name="key"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Chave de acesso Gemini (opcional)</FormLabel>
                    <Input
                      placeholder="Digite a chave se tiver uma"
                      {...field}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de conta</FormLabel>
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="user">Usuário</SelectItem>
                        <SelectItem value="teacher">Professor</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button className="w-full" type="submit">
                Registrar
              </Button>

              <p className="mt-4 text-center text-muted-foreground text-sm">
                Já tem uma conta?{' '}
                <Link className="text-blue-500 hover:underline" to="/login">
                  Entrar
                </Link>
              </p>
            </form>
          </Form>
        </CardContent>
      </Card>
    </section>
  );
}
