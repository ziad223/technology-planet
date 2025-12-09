import { useTranslations } from "next-intl";

const Customsearch = () => {
  const t = useTranslations("Header");
  return (
    <div className="relative w-full z-[1000]">
      <label htmlFor="Search" className="sr-only"></label>

      <input
        type="search"
        id="Search"
        placeholder={t("search")}
        className=" rounded-[10px] w-full h-full bg-slate-600 md:bg-white  focus:outline-none border-[1px] border-[#EBEBEB] border-solid px-[50px] py-[12px]  sm:text-sm"
      />

      <span className="absolute inset-y-0 start-0 grid w-10 place-content-center">
        <button type="button" className="text-gray-600 hover:text-gray-700">
          <span className="sr-only">Search</span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="h-6 w-6 text-[#EBEBEB]"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </span>
    </div>
  );
};

export default Customsearch;
