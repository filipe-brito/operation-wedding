import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLoading } from "@/context/LoadingContext";
import { ValidateInvitationForm } from "./components/ValidateInvitationForm";
import api from "@/api/api";
import { ConfirmCompanionsForm } from "./components/ConfirmCompanionsForm";
import { Turnstile } from "@marsidev/react-turnstile";
import { ErrorModal } from "./components/ErrorModal";
import { LetterIcon } from "../../components/atoms/Icons";
import { FinishConfirmation } from "./components/FinishConfirmation";

const RSVPPage = () => {
  const [buttonLoading, setButtonLoading] = useState(false);
  const { isLoading, setIsLoading } = useLoading();
  const [step, setStep] = useState("validate_invitation");
  const [errorMessage, setErrorMessage] = useState("");
  const [captchaToken, setCaptchaToken] = useState(null);
  const [returnModal, setReturnModal] = useState(false);
  const methods = useForm();
  const {
    watch,
    register,
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = methods;

  useEffect(() => {
    setIsLoading(true);
    const turnOff = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(turnOff);
  }, []);

  useEffect(() => {
    setValue("captcha_token", captchaToken); // Armazena o token no React Hook Form
  }, [captchaToken]);

  const validateInvitation = async (data) => {
    try {
      setButtonLoading(true);
      const response = await api.post("/guests/fetch", {
        phone: data.phone,
        invite_code: data.invite_code,
        will_attend: data.will_attend,
        captcha_token: data.captcha_token,
      });
      console.log("Convite validado com sucesso: ", response.data);

      const dadosAtuaisDoFormulario = methods.getValues();

      methods.reset({
        ...dadosAtuaisDoFormulario,
        id: response.data.id,
        full_name: response.data.full_name,
        companions: response.data.companions,
      });

      console.log("Corpo atual do form: ", methods.getValues());
      if (response.data.will_attend === "false") {
        setStep("finish");
        return;
      }
      setStep("confirm_companions");
      setButtonLoading(false);
      return response.data;
    } catch (error) {
      console.warn("Erro ao validar convite: ", error.response.data);
      setErrorMessage(error.response.data.message);
      setReturnModal(true);
      setButtonLoading(false);
      throw error;
    }
  };

  const confirmAttendance = async (data) => {
    try {
      setButtonLoading(true);
      const response = await api.post("/guests/confirm", data);
      setStep("finish");
      setButtonLoading(false);
      return response.data;
    } catch (error) {
      console.warn(
        "Erro ao confirmar acompanhantes: ",
        error.response.data.detail,
      );
      setErrorMessage(error.response.data.message);
      setReturnModal(true);
      setButtonLoading(false);
      throw error;
    }
  };

  const content = () => {
    switch (step) {
      case "validate_invitation":
        return (
          <ValidateInvitationForm
            methods={methods}
            validateInvitation={validateInvitation}
            buttonLoading={buttonLoading}
          />
        );

      case "confirm_companions":
        return (
          <ConfirmCompanionsForm
            methods={methods}
            confirmAttendance={confirmAttendance}
            buttonLoading={buttonLoading}
          />
        );

      case "finish":
        return (
          <FinishConfirmation willAttend={watch("will_attend") === "true"} />
        );
    }
  };

  return (
    <div className="w-9/10 md:w-8/10 flex items-center justify-center flex-col gap-10 py-20">
      <div className="flex items-center justify-center">
        <img
          src="couple-celebrating.svg"
          alt="Mascote do casal"
          className="size-32"
        />
        <h1 className="text-5xl font-[GreatVibes] font-bold text-center">
          Confirmação <br className="md:hidden" />
          de
          <br className="md:hidden" /> Presença
        </h1>
      </div>

      <div className="p-4 rounded-full flex bg-black/20">
        <LetterIcon className="size-12" />
      </div>

      <form
        onSubmit={methods.handleSubmit(confirmAttendance)}
        className="relative w-full flex flex-col"
      >
        {returnModal && (
          <div className="absolute w-full h-full flex flex-col items-center justify-center bg-black/10 rounded-md">
            <ErrorModal
              errorMessage={errorMessage}
              onClick={() => setReturnModal(false)}
            />
          </div>
        )}
        {content()}
      </form>
      <div className="flex justify-center my-4">
        <Turnstile
          siteKey={import.meta.env.VITE_CLOUDFLARE_TURNSTILE_SITE_KEY}
          onSuccess={(token) => {
            console.log("A Cloudflare confirmou humanidade:", token);
            setCaptchaToken(token);
          }}
          onError={() => setCaptchaToken(null)}
          onExpire={() => setCaptchaToken(null)}
        />
      </div>
    </div>
  );
};

export default RSVPPage;
