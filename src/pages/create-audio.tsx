/** biome-ignore-all lint/suspicious/noConsole: <explanation> testes para audio */

import { ArrowLeft } from 'lucide-react';
import { useRef, useState } from 'react';
import { Link, Navigate, useLocation, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { RecordingVisualizer } from '@/components/ui/recording-visualizer';
import type { RoomParams } from './types/room-params';

const isRecordingSupported =
  !!navigator.mediaDevices &&
  typeof navigator.mediaDevices.getUserMedia === 'function' &&
  typeof window.MediaRecorder === 'function';

export function CreateAudio() {
  const location = useLocation();
  const userId = location.state?.userId;
  const params = useParams<RoomParams>();
  const [isRecording, setIsRecording] = useState(false);
  const recorder = useRef<MediaRecorder | null>(null);
  const intervalRef = useRef<NodeJS.Timeout>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [hasShownSuccess, setHasShownSuccess] = useState(false);

  function stopRecording() {
    setIsRecording(false);

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    if (recorder.current && recorder.current.state !== 'inactive') {
      recorder.current.stop();
    }

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }

  function formatTime(seconds: number) {
    const min = String(Math.floor(seconds / 60)).padStart(2, '0');
    const sec = String(seconds % 60).padStart(2, '0');
    return `${min}:${sec}`;
  }

  async function uploadAudio(audio: Blob) {
    try {
      const formData = new FormData();
      formData.append('file', audio, 'audio.webm');

      const response = await fetch(
        `http://localhost:3333/rooms/${params.roomId}/audio/${userId}`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error('Erro ao enviar o áudio');
      }

      if (!hasShownSuccess) {
        toast.success('Áudio enviado com sucesso!');
        setHasShownSuccess(true);
      }
    } catch (error) {
      console.error(error);
      toast.error('Erro ao enviar o áudio.');
    }
  }

  function createRecorder(audio: MediaStream) {
    recorder.current = new MediaRecorder(audio, {
      mimeType: 'audio/webm',
      audioBitsPerSecond: 64_000,
    });

    recorder.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        uploadAudio(event.data);
      }
    };

    recorder.current.onstart = () => {
      console.log('Gravação iniciada!');
    };

    recorder.current.onstop = () => {
      console.log('Gravação encerrada/pausada');
    };

    recorder.current.start();
  }

  async function startRecording() {
    if (!isRecordingSupported) {
      alert('O seu navegador não suporta gravação');
      return;
    }

    setIsRecording(true);
    setElapsedTime(0);

    timerRef.current = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);

    const audio = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        sampleRate: 44_100,
      },
    });

    createRecorder(audio);

    intervalRef.current = setInterval(() => {
      recorder.current?.stop();

      createRecorder(audio);
    }, 5000);

    setHasShownSuccess(false);
  }

  if (!params.roomId) {
    return <Navigate replace to="/" />;
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-3">
      {isRecording ? (
        <Button onClick={stopRecording}>Pausar gravação</Button>
      ) : (
        <Button onClick={startRecording}>Gravar áudio</Button>
      )}
      {isRecording ? <RecordingVisualizer /> : <p>Pausado</p>}
      <p className="text-green-500 text-lg">{formatTime(elapsedTime)}</p>
      <Link state={{ userId }} to={`/room/${params.roomId}`}>
        <Button variant="outline">
          <ArrowLeft className="size-4" />
          Voltar
        </Button>
      </Link>
    </div>
  );
}
