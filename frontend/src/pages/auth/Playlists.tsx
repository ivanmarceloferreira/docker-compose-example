import PageContainer from "@/components/custom/PageContainer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Playlist } from "@/types/playlist";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { MdPlaylistPlay } from "react-icons/md";

const PlaylistItem = ({ playlist }: { playlist: Playlist }) => {
  return (
    <AccordionItem value={String(playlist.id)}>
      <AccordionTrigger className="w-full">
        <div className="text-lg py-1 flex justify-between  w-full pr-4">
          <p className="flex gap-4 items-center">
            <MdPlaylistPlay size={28} />
            {playlist.name}
          </p>
          <p>{playlist.musics.length} Músicas</p>
        </div>
      </AccordionTrigger>
      <AccordionContent className="bg-green-50 p-4 rounded-md">
        <div className="flex flex-col gap-4 ">
          {playlist.musics.map((music, index) => (
            <div className="flex flex-col">
              <span className="font-semibold text-base">
                {index + 1}. {music.name}
              </span>
              <span>{music.artist.name}</span>
            </div>
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

const Playlists = () => {
  const [loading, setLoading] = useState(false);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  const handleRequest = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get("/playlists");
      setPlaylists(response.data as Playlist[]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    handleRequest();
  }, []);

  if (loading) {
    return (
      <PageContainer className="justify-center">
        <FaSpinner className="animate-spin" size={32} color="teal" />
      </PageContainer>
    );
  }

  return (
    <div className="p-6">
      <PageContainer>
        <Accordion type="single" collapsible className="w-full px-4">
          {playlists.map((playlist) => (
            <PlaylistItem playlist={playlist} />
          ))}
        </Accordion>
      </PageContainer>
    </div>
  );
};

export default Playlists;
