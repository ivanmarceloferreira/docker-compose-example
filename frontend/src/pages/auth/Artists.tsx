import PageContainer from "@/components/custom/PageContainer";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Table,
} from "@/components/ui/table";
import { Artist } from "@/types/artist";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { format } from "date-fns";
import {
  HiMiniPlus,
  HiOutlinePencilSquare,
  HiOutlineTrash,
} from "react-icons/hi2";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { AlertDialogAction } from "@radix-ui/react-alert-dialog";
import { useToast } from "@/hooks/use-toast";

const Artists = () => {
  const [loading, setLoading] = useState(false);
  const [artists, setArtists] = useState<Artist[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleRequest = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get("/artists");
      setArtists(response.data as Artist[]);
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

  const handleDelete = async (id: number) => {
    try {
      setLoading(true);
      await axios.delete(`/artists/${id}`);
      toast({
        title: "Sucesso",
        description: "Artista deletado com sucesso",
      });
      await handleRequest();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col flex-1 gap-6 p-6">
        <div className=" flex justify-between items-center bg-white rounded-md p-4">
          <span className="text-xl font-semibold text-teal-800">Artistas</span>
          <Link
            className="text-base flex bg-slate-900 text-white py-2 px-3 rounded-lg"
            to="/artists/new"
          >
            <HiMiniPlus size={24} /> Artista
          </Link>
        </div>
        <PageContainer>
          <Table>
            <TableHeader>
              <TableRow className="text-lg">
                <TableHead className="w-[100px] py-4">Id</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Criado em</TableHead>
                <TableHead>Atualizado em</TableHead>
                <TableHead className="text-center">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {artists.map((artist) => (
                <TableRow key={artist.id}>
                  <TableCell className="font-medium py-6">
                    {artist.id}
                  </TableCell>
                  <TableCell>{artist.name}</TableCell>
                  <TableCell>{format(artist.createdAt, "Pp")}</TableCell>
                  <TableCell>{format(artist.updatedAt, "Pp")}</TableCell>
                  <TableCell className="text-center">
                    <Button
                      variant="ghost"
                      onClick={() => navigate(`/artists/${artist.id}`)}
                    >
                      <HiOutlinePencilSquare />
                    </Button>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost">
                          <HiOutlineTrash color="red" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Deseja deletar este artista {artist.name}?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Essa ação não poderá ser desfeita
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(artist.id)}
                          >
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </PageContainer>
      </div>
    </>
  );
};

export default Artists;
