// import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import loginImage from "../../assets/login-image.webp";

import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/custom/Logo";
import { TextInput } from "@/components/custom/TextInput";

type ILoginForm = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const form = useForm<ILoginForm>();
  const onSubmit: SubmitHandler<ILoginForm> = (data) => console.log(data);

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
            <Button type="submit" className="bg-slate-800">
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
