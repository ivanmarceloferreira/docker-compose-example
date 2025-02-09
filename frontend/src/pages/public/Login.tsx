// import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router";
import loginImage from "../../assets/login-image.webp";

import { FormProvider, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/custom/Logo";
import { TextInput } from "@/components/custom/TextInput";
import { useCallback, useContext, useState } from "react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import AuthContext from "@/contexts/auth";

type ILoginForm = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const form = useForm<ILoginForm>();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const onSubmit = useCallback(
    async (values: ILoginForm) => {
      try {
        setLoading(true);
        const { data } = await axios.post("/auth/login", {
          email: values.email,
          password: values.password,
        });
        authContext.login(data.token);
        navigate("/playlists");
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
    },
    [authContext, navigate, toast]
  );

  return (
    <article>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <section className="flex flex-col gap-8 pt-10">
            <TextInput
              type="email"
              label="E-mail"
              name="email"
              rules={{ required: true }}
            />
            <TextInput
              type="password"
              label="Senha"
              name="password"
              rules={{ required: true }}
            />
            <Button type="submit" className="bg-slate-800" loading={loading}>
              Entrar
            </Button>
          </section>
        </form>
      </FormProvider>
    </article>
  );
};

const Login = () => {
  return (
    <div className="flex">
      <img
        src={loginImage}
        className="w-[50vw] h-screen object-cover"
        alt="Vite logo"
      />
      <section className="py-12 px-24 flex-1">
        <Logo />
        <div className=" pt-32">
          <h1 className="text-4xl font-semibold pb-4">Entrar</h1>
          <span className="text-slate-700">
            Informe o e-mail e senha cadastrados. Novo por aqui?
            <Link
              to="/signup"
              className="text-teal-600 hover:border-b font-medium"
            >
              {" "}
              Cadastre-se!
            </Link>
          </span>
          <LoginForm />
        </div>
      </section>
    </div>
  );
};

export default Login;
