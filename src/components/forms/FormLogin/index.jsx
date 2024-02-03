import { useForm } from "react-hook-form";
import { useUserContext } from "../../../Providers/UserContext";
import { InputTemplate } from "../../templates/InputTemplate";
import { Link } from "react-router-dom";

const FormLogin = () => {
  const { userLogin } = useUserContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const submit = (formData) => {
    userLogin(formData);
  };

  return (
    <>
      <div className={styles.login}>
        <div className={styles.login__container}>
          <h3 className="title-1">Login</h3>

          <form className={styles.login__form} onSubmit={handleSubmit(submit)}>
            <InputTemplate
              type="text"
              label="Email"
              placeHolder="Digite seu email aqui..."
              {...register("email")}
              error={errors.email}
            />

            <InputTemplate
              type="password"
              label="Senha"
              placeHolder="Digite sua senha aqui..."
              {...register("password")}
              error={errors.password}
            />
            <button className="buttonEnable" type="submit">
              Entrar
            </button>
          </form>

          <form className={styles.register__container}>
            <small className={styles.register__text}>
              Ainda não possui conta?
            </small>
            <Link className="buttonRegister" to="/register">
              Cadastre-se
            </Link>
          </form>

        </div>
      </div>
    </>
  );
};

export { FormLogin }