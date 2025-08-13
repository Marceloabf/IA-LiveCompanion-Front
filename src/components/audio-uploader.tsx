import { Loader2, UploadIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface AudioUploaderProps {
  roomId: string;
  userId: string;
}

export function AudioUploader({ roomId, userId }: AudioUploaderProps) {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  function handleAudioChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file?.type.startsWith('audio/')) {
      setAudioFile(file);
      setAudioURL(URL.createObjectURL(file));
    } else {
      alert('Por favor, envie um arquivo de áudio válido (.mp3, .wav, .ogg)');
    }
  }

  async function handleUpload() {
    if (!audioFile) {
      toast.error('Por favor, selecione um arquivo de áudio.');
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', audioFile, audioFile.name);
      const token = sessionStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found');
      }

      const response = await fetch(
        `http://localhost:3333/rooms/${roomId}/audio/${userId}`,
        {
          method: 'POST',
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Erro ao enviar o áudio');
      }

      toast.success('Áudio enviado com sucesso!');
    } catch (error) {
      // biome-ignore lint/suspicious/noConsole: using for debbugging
      console.error(error);
      toast.error('Erro ao enviar o áudio.');
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <Card className="mx-auto mt-6 w-full max-w-md">
      <CardHeader>
        <CardTitle>Upload de Áudio</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col space-y-4">
        <Label htmlFor="audio">Escolha um arquivo de áudio</Label>
        <Input
          accept="audio/*"
          className="cursor-pointer"
          id="audio"
          onChange={handleAudioChange}
          type="file"
        />

        {audioFile && (
          <div className="space-y-2">
            <p className="text-muted-foreground text-sm">{audioFile.name}</p>
            {audioURL && (
              /** biome-ignore lint/a11y/useMediaCaption: <it will come as a feature in the future> */
              <audio className="w-full rounded-md" controls src={audioURL} />
            )}
          </div>
        )}

        <Button
          disabled={!audioFile || isUploading}
          onClick={handleUpload}
          variant="secondary"
        >
          <UploadIcon className="mr-2 h-4 w-4" />
          {isUploading ? (
            <Loader2 className="size-4 animate-spin text-primary" />
          ) : (
            'Enviar Áudio'
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
