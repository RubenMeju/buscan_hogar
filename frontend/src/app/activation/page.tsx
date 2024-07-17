import Activation from "./components/Activation";

export default function Page() {
  return (
    <div className="pt-32  px-4 py-8 sm:px-6">
      <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
        <div className="ml-4 mt-4">
          <h3 className="font-recife-bold text-3xl leading-6 text-gray-900 dark:text-dark-txt">
            Bienvenido a Mascotas
          </h3>
          <p className="font-regular mt-2 max-w-4xl text-lg text-gray-900 dark:text-dark-txt-secondary">
            Verifique su cuenta
          </p>
        </div>
        <Activation />
      </div>
    </div>
  );
}
