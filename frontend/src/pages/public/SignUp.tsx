// import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import loginImage from "../../assets/login-image.webp";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/custom/Logo";
import { TextInput } from "@/components/custom/TextInput";
import { cpf } from "cpf-cnpj-validator";
import { useCallback, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

import { useToast } from "@/hooks/use-toast";

type ISignUpForm = {
  email: string;
  password: string;
  confirmPassword: string;
  document: string;
  name: string;
};

const SignUpForm = () => {
  const form = useForm<ISignUpForm>();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const password = form.watch("password");
  const confirmPassword = form.watch("confirmPassword");

  const onCreateUser = useCallback(
    async (values: ISignUpForm) => {
      try {
        setLoading(true);
        await axios.post("/users", {
          name: values.name,
          email: values.email,
          password: values.password,
          document: values.document,
        });
        toast({
          title: "Sucesso",
          description: "Usuário criado com sucesso!",
        });
        navigate("/login");
      } catch (error) {
        console.log(error);
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
    [navigate, toast]
  );

  return (
    <article>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onCreateUser)}>
          <section className="flex flex-col gap-8 pt-10">
            <TextInput label="Nome" name="name" rules={{ required: true }} />
            <TextInput
              type="email"
              label="E-mail"
              name="email"
              rules={{ required: true }}
            />
            <TextInput
              type="text"
              label="CPF"
              name="document"
              rules={{
                validate: {
                  validCPF: (value: string) =>
                    cpf.isValid(value) || "CPF inválido",
                },
              }}
            />
            <TextInput
              type="password"
              label="Senha"
              name="password"
              rules={{ required: true }}
            />
            <TextInput
              type="password"
              label="Confirme a senha"
              name="confirmPassword"
              rules={{
                validate: {
                  matchPassword: () =>
                    Boolean(password === confirmPassword) ||
                    "Senhas não conferem",
                },
              }}
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

const SignUp = () => {
  return (
    <div className="flex">
      <img
        src={loginImage}
        className="w-[50vw] h-screen object-cover"
        alt="Vite logo"
      />
      <section className="py-12 px-24 flex-1">
        <Logo />
        <div className="pt-32">
          <h1 className="text-4xl font-semibold pb-4">Cadastre-se</h1>
          <span className="text-slate-700">
            Informe o e-mail, CPF e crie uma senha senha. Já possui uma conta?
            <Link to="/" className="text-teal-600 hover:border-b font-medium">
              {" "}
              Entrar!
            </Link>
          </span>
          <SignUpForm />
        </div>
      </section>
    </div>
  );
};

export default SignUp;
