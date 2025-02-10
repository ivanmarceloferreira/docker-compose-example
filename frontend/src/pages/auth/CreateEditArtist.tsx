import PageContainer from "@/components/custom/PageContainer";
import PagheHeader from "@/components/custom/PagheHeader";
import { TextInput } from "@/components/custom/TextInput";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { MdOutlinePersonSearch } from "react-icons/md";
import { useParams } from "react-router";

type IArtistForm = {
  name: string;
};

const CreateEditArtist = () => {
  const form = useForm<IArtistForm>();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { id } = useParams();
  const isNew = id === "new";
  const unsaved = form.formState.isDirty;

  const handleRequest = useCallback(async () => {
    try {
      if (isNew) return;
      setLoading(true);
      const { data } = await axios.get(`/artists/${id}`);
      form.reset({ ...data });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast({
          variant: "destructive",
          title: "Erro",
          description: error?.response?.data?.error,
        });
      }
    } finally {
      setLoading(false);
    }
  }, [form, id, isNew, toast]);

  useEffect(() => {
    handleRequest();
  }, []);

  const onSubmit = async (values: IArtistForm) => {
    try {
      setLoading(true);
      if (isNew) {
        await axios.post("/artists", {
          name: values.name,
        });
      } else {
        await axios.put(`/artists/${id}`, {
          name: values.name,
        });
      }
      toast({
        title: "Sucesso",
        description: `Artista ${isNew ? "criado" : "editado"} com sucesso`,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast({
          variant: "destructive",
          title: "Erro",
          description: error?.response?.data?.error,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormProvider {...form}>
      <div className="flex flex-col justify-center">
        <PagheHeader
          title="Cadastrar Artista"
          id={isNew ? id : undefined}
          actionButton={
            <Button
              type="submit"
              className="bg-slate-800"
              loading={loading}
              onClick={form.handleSubmit(onSubmit)}
            >
              Salvar
            </Button>
          }
          icon={<MdOutlinePersonSearch size={28} />}
          unsaved={unsaved}
        ></PagheHeader>
        <div className="flex flex-col justify-start flex-1 p-6">
          <PageContainer>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
              <section className="grid grid-cols-2 pt-2">
                <TextInput
                  label="Nome do artista"
                  name="name"
                  rules={{ required: true }}
                />
              </section>
            </form>
          </PageContainer>
        </div>
      </div>
    </FormProvider>
  );
};

export default CreateEditArtist;
