import { UploadIcon } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function AudioUploader() {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [audioURL, setAudioURL] = useState<string | null>(null);

  function handleAudioChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file?.type.startsWith('audio/')) {
      setAudioFile(file);
      setAudioURL(URL.createObjectURL(file));
    } else {
      alert('Por favor, envie um arquivo de áudio válido (.mp3, .wav, .ogg)');
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

        <Button disabled={!audioFile} variant="secondary">
          <UploadIcon className="mr-2 h-4 w-4" />
          Enviar Áudio
        </Button>
      </CardContent>
    </Card>
  );
}
