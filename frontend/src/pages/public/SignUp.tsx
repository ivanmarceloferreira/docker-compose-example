// import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import loginImage from "../../assets/login-image.webp";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/custom/Logo";
import { TextInput } from "@/components/custom/TextInput";
import { cpf } from "cpf-cnpj-validator";

type ISignUpForm = {
  email: string;
  password: string;
  confirmPassword: string;
  cpf: string;
};

const SignUpForm = () => {
  const form = useForm<ISignUpForm>();
  const onSubmit: SubmitHandler<ISignUpForm> = (data) => console.log(data);

  const password = form.watch("password");
  const confirmPassword = form.watch("confirmPassword");

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
              type="text"
              label="CPF"
              name="cpf"
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
            <Button type="submit" className="bg-slate-800">
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
