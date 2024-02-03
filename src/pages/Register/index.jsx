import { FormProvider } from "react-hook-form"
import { HeaderTemplate } from "../../components"

const Register = () => {
    return (
        <>
        <div className="container sm">
            <HeaderTemplate button={true} text={"Voltar"} value={"/"} />

            <FormRegister />
        </div>
        </>
    )
}

export { Register }